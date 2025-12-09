import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter } from "lucide-react";
import { toast } from "sonner";

export default function AuditLogViewer() {
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: logs, isLoading } = trpc.auditLog.recent.useQuery({ limit: 100 });

  const filteredLogs = logs?.filter((log) => {
    if (actionFilter !== "all" && log.action !== actionFilter) return false;
    if (entityTypeFilter !== "all" && log.entityType !== entityTypeFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        log.action.toLowerCase().includes(query) ||
        log.userName?.toLowerCase().includes(query) ||
        log.entityType.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const uniqueActions = Array.from(new Set(logs?.map((l) => l.action) || []));
  const uniqueEntityTypes = Array.from(new Set(logs?.map((l) => l.entityType) || []));

  const exportToCSV = () => {
    if (!filteredLogs || filteredLogs.length === 0) {
      toast.error("No logs to export");
      return;
    }

    const headers = ["Timestamp", "User", "Action", "Entity Type", "Entity ID", "Details"];
    const rows = filteredLogs.map((log) => [
      new Date(log.timestamp).toISOString(),
      log.userName || "Unknown",
      log.action,
      log.entityType,
      log.entityId.toString(),
      log.details || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `audit-logs-${new Date().toISOString()}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Audit logs exported successfully");
  };

  const getActionBadge = (action: string) => {
    if (action.includes("created")) return <Badge variant="default">Created</Badge>;
    if (action.includes("updated")) return <Badge variant="secondary">Updated</Badge>;
    if (action.includes("deleted")) return <Badge variant="destructive">Deleted</Badge>;
    if (action.includes("approved")) return <Badge variant="default">Approved</Badge>;
    if (action.includes("rejected")) return <Badge variant="destructive">Rejected</Badge>;
    return <Badge variant="outline">{action}</Badge>;
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit Log Viewer</h1>
          <p className="text-muted-foreground">
            Comprehensive logging of all AI interactions and system actions
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              {uniqueActions.map((action) => (
                <SelectItem key={action} value={action}>
                  {action}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              {uniqueEntityTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Showing {filteredLogs?.length || 0} of {logs?.length || 0} total logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading audit logs...</div>
          ) : filteredLogs && filteredLogs.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity Type</TableHead>
                    <TableHead>Entity ID</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.userName || "Unknown"}</TableCell>
                      <TableCell>{getActionBadge(log.action)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.entityType}</Badge>
                      </TableCell>
                      <TableCell className="font-mono">{log.entityId}</TableCell>
                      <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                        {log.details || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No audit logs found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
