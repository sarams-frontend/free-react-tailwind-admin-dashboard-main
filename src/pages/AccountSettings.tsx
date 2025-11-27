import { useState } from "react";
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import PageMeta from '@/components/common/PageMeta';
import Button from '@/components/ui/button/Button';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

export default function AccountSettings() {
  const { isOpen, openModal, closeModal } = useModal();
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin Snsorial",
      email: "admin@snsorial.com",
      role: "Administrator",
      status: "active",
    },
    {
      id: "2",
      name: "John Doe",
      email: "john@snsorial.com",
      role: "User",
      status: "active",
    },
    {
      id: "3",
      name: "Jane Smith",
      email: "jane@snsorial.com",
      role: "User",
      status: "inactive",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
  });

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = () => {
    if (formData.name && formData.email) {
      if (editingUserId) {
        // Edit existing user
        setUsers(
          users.map((user) =>
            user.id === editingUserId
              ? { ...user, name: formData.name, email: formData.email, role: formData.role }
              : user
          )
        );
        setEditingUserId(null);
      } else {
        // Add new user
        const newUser: User = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: "active",
        };
        setUsers([...users, newUser]);
      }
      setFormData({ name: "", email: "", role: "User" });
      closeModal();
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    openModal();
  };

  const handleCloseModal = () => {
    setEditingUserId(null);
    setFormData({ name: "", email: "", role: "User" });
    closeModal();
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user
      )
    );
  };

  return (
    <>
      <PageMeta
        title="Account Settings | Snsorial"
        description="Manage your account settings and user permissions"
      />
      <PageBreadcrumb pageTitle="Account Settings" />

      <div className="space-y-6">
        {/* Account Information */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Account Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Account Type</p>
              <p className="mt-1 text-base font-medium text-gray-800 dark:text-white/90">
                Business Account
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Company Name</p>
              <p className="mt-1 text-base font-medium text-gray-800 dark:text-white/90">
                Snsorial Systems
              </p>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <div className="mb-5 flex items-center justify-between lg:mb-7">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              User Management
            </h3>
            <Button size="sm" onClick={openModal}>
              <svg
                className="mr-2"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3.75V14.25M3.75 9H14.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add User
            </Button>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Name
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Role
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="pb-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-800 last:border-0"
                  >
                    <td className="py-4 text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.name}
                    </td>
                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                      {user.role}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Edit user"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete user"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
            Security Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorAuth ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorAuth ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive alerts about account activity
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailNotifications ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      <Modal isOpen={isOpen} onClose={handleCloseModal} className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="mb-6">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {editingUserId ? "Edit User" : "Add New User"}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {editingUserId
                ? "Update the user information below."
                : "Enter the details of the new user to add them to your account."}
            </p>
          </div>
          <form className="space-y-5">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label>Role</Label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:text-white/90 dark:focus:border-brand-800"
              >
                <option value="User">User</option>
                <option value="Administrator">Administrator</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Button size="sm" variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddUser}>
                {editingUserId ? "Save Changes" : "Add User"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}