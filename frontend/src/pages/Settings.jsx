import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
    UserRound,
    Palette,
    LayoutGrid,
    Bell,
    ShieldCheck,
    ChevronRight,
    Moon,
    Sun,
    Check,
    LogOut
} from 'lucide-react'
import '../App.css'
import PageHeader from '../components/PageHeader.jsx'

function Settings() {
    const { layout, setLayout } = useOutletContext()

    const [theme, setTheme] = useState('light')
    const [notifications, setNotifications] = useState(true)
    const [emailNotifications, setEmailNotifications] = useState(false)
    const [autoSave, setAutoSave] = useState(true)

    const SettingSection = ({ icon: Icon, title, description, children }) => (
        <section className="w-full rounded-2xl border border-purple-100 bg-white p-5 mobile:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <Icon size={20} />
                </div>
                <div>
                    <h2 className="font-semibold text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                {children}
            </div>
        </section>
    )

    const Toggle = ({ checked, onChange }) => (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                checked ? 'bg-purple-600' : 'bg-gray-300'
            }`}
        >
            <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    checked ? 'translate-x-5' : 'translate-x-0.5'
                }`}
            />
        </button>
    )

    const SettingRow = ({ title, description, children }) => (
        <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800">{title}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
            </div>
            {children}
        </div>
    )

    return (
        <div className="flex w-full flex-col items-center gap-6 px-4 py-2 mt-12 mb-18 mobile:px-6 tablet:mt-0 tablet:mb-0">
            <PageHeader
                title="Settings"
                description="Personalize your space and make TidyNote feel like yours."
                showLayout={false}
            />

            <div className="flex w-full flex-col gap-5">

                {/* Profile */}
                <SettingSection
                    icon={UserRound}
                    title="Profile"
                    description="Your personal information"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-purple-200 to-pink-200 text-xl font-semibold text-purple-700">
                            U
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-800">Your Name</p>
                            <p className="text-sm text-gray-500">your.email@example.com</p>
                        </div>
                        <button
                            type="button"
                            className="rounded-xl border border-purple-200 px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-50"
                        >
                            Edit
                        </button>
                    </div>
                </SettingSection>

                {/* Appearance */}
                <SettingSection
                    icon={Palette}
                    title="Appearance"
                    description="Choose how your workspace looks"
                >
                    <SettingRow
                        title="Interface theme"
                        description="Select your preferred appearance"
                    >
                        <div className="flex shrink-0 gap-2">
                            <button
                                type="button"
                                onClick={() => setTheme('light')}
                                className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm ${
                                    theme === 'light'
                                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                                        : 'border-gray-200 text-gray-600'
                                }`}
                            >
                                <Sun size={16} /> Light
                                {theme === 'light' && <Check size={14} />}
                            </button>
                            <button
                                type="button"
                                onClick={() => setTheme('dark')}
                                className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm ${
                                    theme === 'dark'
                                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                                        : 'border-gray-200 text-gray-600'
                                }`}
                            >
                                <Moon size={16} /> Dark
                                {theme === 'dark' && <Check size={14} />}
                            </button>
                        </div>
                    </SettingRow>
                    <p className="text-xs text-gray-400">
                        Preview setting only. The app theme will not change until dark mode is implemented.
                    </p>
                </SettingSection>

                {/* Notes preferences */}
                <SettingSection
                    icon={LayoutGrid}
                    title="Notes Preferences"
                    description="Manage how your notes are displayed"
                >
                    <SettingRow
                        title="Default notes layout"
                        description="Choose your preferred notes view"
                    >
                        <div className="flex shrink-0 rounded-xl bg-purple-50 p-1">
                            <button
                                type="button"
                                onClick={() => setLayout('grid')}
                                className={`rounded-lg px-3 py-2 text-sm transition ${
                                    layout === 'grid'
                                        ? 'bg-white text-purple-700 shadow-sm'
                                        : 'text-gray-500'
                                }`}
                            >
                                Grid
                            </button>
                            <button
                                type="button"
                                onClick={() => setLayout('list')}
                                className={`rounded-lg px-3 py-2 text-sm transition ${
                                    layout === 'list'
                                        ? 'bg-white text-purple-700 shadow-sm'
                                        : 'text-gray-500'
                                }`}
                            >
                                List
                            </button>
                        </div>
                    </SettingRow>

                    <SettingRow
                        title="Auto-save notes"
                        description="Automatically save changes while editing"
                    >
                        <Toggle checked={autoSave} onChange={setAutoSave} />
                    </SettingRow>
                </SettingSection>

                {/* Notifications */}
                <SettingSection
                    icon={Bell}
                    title="Notifications"
                    description="Control your notification preferences"
                >
                    <SettingRow
                        title="In-app notifications"
                        description="Receive reminders and activity updates"
                    >
                        <Toggle
                            checked={notifications}
                            onChange={setNotifications}
                        />
                    </SettingRow>

                    <SettingRow
                        title="Email notifications"
                        description="Receive updates in your inbox"
                    >
                        <Toggle
                            checked={emailNotifications}
                            onChange={setEmailNotifications}
                        />
                    </SettingRow>
                </SettingSection>

                {/* Privacy */}
                <SettingSection
                    icon={ShieldCheck}
                    title="Privacy & Security"
                    description="Keep your account secure"
                >
                    <button
                        type="button"
                        className="flex items-center justify-between gap-3 text-left"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                Password & security
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Manage your account security
                            </p>
                        </div>
                        <ChevronRight size={19} className="shrink-0 text-gray-400" />
                    </button>

                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-red-600">Sign out</p>
                            <p className="mt-1 text-xs text-gray-500">
                                Sign out of your current account
                            </p>
                        </div>
                        <LogOut size={18} className="shrink-0 text-red-400" />
                    </div>
                </SettingSection>

                <p className="pb-2 text-center text-xs text-gray-400">
                    TidyNote · Made for your thoughts
                </p>
            </div>
        </div>
    )
}

export default Settings