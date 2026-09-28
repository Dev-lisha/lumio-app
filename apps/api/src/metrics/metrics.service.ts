import { Injectable } from "@nestjs/common";

const escapeLabel = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/"/g, '\\"');

@Injectable()
export class MetricsService {
  private readonly requestCounts = new Map<string, number>();

  recordRequest(method: string, statusCode: number): void {
    const key = JSON.stringify([method, statusCode]);
    this.requestCounts.set(key, (this.requestCounts.get(key) ?? 0) + 1);
  }

  getMetrics(): string {
    const uptimeSeconds = process.uptime();
    const cpuUsage = process.cpuUsage();
    const memoryUsage = process.memoryUsage();
    const [nodeMajor = "0", nodeMinor = "0", nodePatch = "0"] = process.versions.node.split(".");
    const metrics = [
      "# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.",
      "# TYPE process_cpu_user_seconds_total counter",
      `process_cpu_user_seconds_total ${(cpuUsage.user / 1_000_000).toFixed(6)}`,
      "# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.",
      "# TYPE process_cpu_system_seconds_total counter",
      `process_cpu_system_seconds_total ${(cpuUsage.system / 1_000_000).toFixed(6)}`,
      "# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.",
      "# TYPE process_cpu_seconds_total counter",
      `process_cpu_seconds_total ${((cpuUsage.user + cpuUsage.system) / 1_000_000).toFixed(6)}`,
      "# HELP process_start_time_seconds Process start time since unix epoch in seconds.",
      "# TYPE process_start_time_seconds gauge",
      `process_start_time_seconds ${(Date.now() / 1000 - uptimeSeconds).toFixed(3)}`,
      "# HELP process_uptime_seconds Process uptime in seconds.",
      "# TYPE process_uptime_seconds gauge",
      `process_uptime_seconds ${uptimeSeconds.toFixed(3)}`,
      "# HELP process_resident_memory_bytes Resident memory size in bytes.",
      "# TYPE process_resident_memory_bytes gauge",
      `process_resident_memory_bytes ${memoryUsage.rss}`,
      "# HELP nodejs_heap_size_total_bytes Process heap size in bytes.",
      "# TYPE nodejs_heap_size_total_bytes gauge",
      `nodejs_heap_size_total_bytes ${memoryUsage.heapTotal}`,
      "# HELP nodejs_heap_size_used_bytes Process heap size used in bytes.",
      "# TYPE nodejs_heap_size_used_bytes gauge",
      `nodejs_heap_size_used_bytes ${memoryUsage.heapUsed}`,
      "# HELP nodejs_external_memory_bytes Node.js external memory size in bytes.",
      "# TYPE nodejs_external_memory_bytes gauge",
      `nodejs_external_memory_bytes ${memoryUsage.external}`,
      "# HELP nodejs_version_info Node.js version information.",
      "# TYPE nodejs_version_info gauge",
      `nodejs_version_info{version="${escapeLabel(process.version)}",major="${nodeMajor}",minor="${nodeMinor}",patch="${nodePatch}"} 1`,
      "# HELP http_requests_total Total HTTP requests completed.",
      "# TYPE http_requests_total counter",
      ...[...this.requestCounts.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, count]) => {
          const [method, statusCode] = JSON.parse(key) as [string, number];
          return `http_requests_total{method="${escapeLabel(method)}",status_code="${statusCode}"} ${count}`;
        }),
    ];

    return `${metrics.join("\n")}\n`;
  }
}
