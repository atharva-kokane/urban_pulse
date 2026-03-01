import { AutomationLogs } from "@/components/automation-logs"

export default function AutomationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">n8n Automation</h1>
        <p className="text-sm text-muted-foreground">Manage and monitor automated workflows and integrations </p>
      </div>
      <AutomationLogs />
    </div>
  )
}
