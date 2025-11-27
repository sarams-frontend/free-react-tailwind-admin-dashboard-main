import { useState } from "react";
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import PageMeta from '@/components/common/PageMeta';
import Button from '@/components/ui/button/Button';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { useUserProfileStore } from '@/store/userProfileStore';

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: "open" | "in-progress" | "resolved";
  date: string;
}

export default function Support() {
  const { firstName, lastName, email } = useUserProfileStore();

  const [formData, setFormData] = useState({
    subject: "",
    category: "technical",
    priority: "medium",
    message: "",
  });

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "1",
      subject: "Login issue",
      category: "Technical",
      priority: "High",
      status: "resolved",
      date: "2025-01-15",
    },
    {
      id: "2",
      subject: "Data export request",
      category: "General",
      priority: "Medium",
      status: "in-progress",
      date: "2025-01-20",
    },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.subject && formData.message) {
      const newTicket: SupportTicket = {
        id: Date.now().toString(),
        subject: formData.subject,
        category: formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
        priority: formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1),
        status: "open",
        date: new Date().toISOString().split("T")[0],
      };

      setTickets([newTicket, ...tickets]);
      setFormData({
        subject: "",
        category: "technical",
        priority: "medium",
        message: "",
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);

      // Aquí puedes agregar la lógica para enviar a un backend
      console.log("Support ticket submitted:", {
        ...formData,
        name: `${firstName} ${lastName}`,
        email: email,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "resolved":
        return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <>
      <PageMeta
        title="Support | Snsorial"
        description="Get help and support for your Snsorial account"
      />
      <PageBreadcrumb pageTitle="Support" />

      <div className="space-y-6">
        {/* Success Message */}
        {showSuccess && (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Your support request has been submitted successfully! We'll get back to you soon.
              </p>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20">
              <svg
                className="h-6 w-6 text-brand-600 dark:text-brand-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
              Email Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              support@snsorial.com
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20">
              <svg
                className="h-6 w-6 text-brand-600 dark:text-brand-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
              Phone Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              +1 (555) 123-4567
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20">
              <svg
                className="h-6 w-6 text-brand-600 dark:text-brand-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
              Business Hours
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mon-Fri: 9AM - 6PM EST
            </p>
          </div>
        </div>

        {/* Support Request Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Submit a Support Request
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <div>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={`${firstName} ${lastName}`}
                  disabled
                  className="bg-gray-50 dark:bg-gray-800"
                />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="bg-gray-50 dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div>
                <Label>Category</Label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:text-white/90 dark:focus:border-brand-800"
                  required
                >
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing</option>
                  <option value="general">General Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                </select>
              </div>
              <div>
                <Label>Priority</Label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:text-white/90 dark:focus:border-brand-800"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Subject</Label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Brief description of your issue"
              />
            </div>

            <div>
              <Label>Message</Label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                placeholder="Please provide detailed information about your request..."
                className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:text-white/90 dark:focus:border-brand-800"
                required
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button size="sm">
                Submit Request
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setFormData({
                    subject: "",
                    category: "technical",
                    priority: "medium",
                    message: "",
                  })
                }
              >
                Clear Form
              </Button>
            </div>
          </form>
        </div>

        {/* My Support Tickets */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            My Support Tickets
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Subject
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Category
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Priority
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-gray-200 dark:border-gray-800 last:border-0"
                  >
                    <td className="py-4 text-sm font-medium text-gray-800 dark:text-white/90">
                      {ticket.subject}
                    </td>
                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                      {ticket.category}
                    </td>
                    <td className="py-4">
                      <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status === "in-progress" ? "In Progress" : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                      {ticket.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <details className="group rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <summary className="cursor-pointer text-sm font-medium text-gray-800 dark:text-white/90">
                How do I reset my password?
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                You can reset your password by clicking on "Forgot Password" on the login page. You'll receive an email with instructions to reset your password.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <summary className="cursor-pointer text-sm font-medium text-gray-800 dark:text-white/90">
                How do I add new users to my account?
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Go to Account Settings and navigate to the User Management section. Click on "Add User" and fill in the required information.
              </p>
            </details>
            <details className="group rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <summary className="cursor-pointer text-sm font-medium text-gray-800 dark:text-white/90">
                What is the response time for support tickets?
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                We aim to respond to all support tickets within 24 hours during business days. High priority tickets are typically addressed within 4 hours.
              </p>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}