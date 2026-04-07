<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Admin\ApprovalService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ApprovalsController extends Controller
{
    public function __construct(private readonly ApprovalService $service)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['status', 'search', 'member_type', 'from_date', 'to_date']);
        $pending = $this->service->list($filters);

        return response()->json([
            'message' => 'Approvals loaded.',
            'data' => UserResource::collection($pending),
        ]);
    }

    public function history(Request $request): JsonResponse
    {
        $filters = $request->only(['status', 'search', 'member_type', 'from_date', 'to_date']);
        $history = $this->service->listHistory($filters);

        return response()->json([
            'message' => 'Approval history loaded.',
            'data' => UserResource::collection($history),
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $filters = $request->only(['status', 'search', 'member_type', 'from_date', 'to_date']);
        $rows = $this->service->list($filters);

        $filename = 'approvals-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($rows) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Name', 'Email', 'Member ID', 'Type', 'Plan', 'Status', 'Date']);

            foreach ($rows as $user) {
                fputcsv($handle, [
                    $user->name,
                    $user->email,
                    $user->member_id,
                    $user->member_type,
                    $user->membership_type,
                    $user->membership_status,
                    optional($user->created_at)->format('Y-m-d'),
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function exportHistory(Request $request): StreamedResponse
    {
        $filters = $request->only(['status', 'search', 'member_type', 'from_date', 'to_date']);
        $rows = $this->service->listHistory($filters);

        $filename = 'approval-history-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($rows) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, [
                'Name',
                'Email',
                'Member ID',
                'Member Type',
                'Status',
                'Approved By',
                'Approved At',
                'Rejected By',
                'Rejected At',
                'Reason',
            ]);

            foreach ($rows as $user) {
                fputcsv($handle, [
                    $user->name,
                    $user->email,
                    $user->member_id,
                    $user->member_type,
                    $user->membership_status,
                    optional($user->approvedBy)->name,
                    optional($user->approved_at)->format('Y-m-d H:i:s'),
                    optional($user->rejectedBy)->name,
                    optional($user->rejected_at)->format('Y-m-d H:i:s'),
                    $user->rejection_reason,
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function approve(Request $request, User $user): JsonResponse
    {
        if ($user->role !== 'member') {
            return response()->json([
                'message' => 'Member not found.',
            ], 404);
        }
        $updated = $this->service->approve($user, $request->user());

        return response()->json([
            'message' => 'Member approved.',
            'user' => new UserResource($updated),
        ]);
    }

    public function reject(Request $request, User $user): JsonResponse
    {
        if ($user->role !== 'member') {
            return response()->json([
                'message' => 'Member not found.',
            ], 404);
        }
        $validated = $request->validate([
            'reason' => ['nullable', 'string', 'max:500'],
        ]);
        $updated = $this->service->reject($user, $request->user(), $validated['reason'] ?? null);

        return response()->json([
            'message' => 'Member rejected.',
            'user' => new UserResource($updated),
        ]);
    }
}
