import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";

export const statusOptions = [
  {
    id: "provisioning",
    label: "Provisioning",
    icon: ClockIcon,
  },
  {
    id: "active",
    label: "Active",
    icon: CheckCircleIcon,
  },
  {
    id: "disabled",
    label: "Disabled",
    icon: XCircleIcon,
  },
  {
    id: "pending",
    label: "Pending",
    icon: ExclamationCircleIcon,
  },
];

export const priorities = [
  {
    id: "high",
    label: "High",
    icon: ArrowUpIcon,
  },
  {
    id: "medium",
    label: "Medium",
    icon: ArrowRightIcon,
  },
  {
    id: "low",
    label: "Low",
    icon: ArrowDownIcon,
  },
];
