import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store,
  Printer,
  Bell,
  Palette,
  Users,
  Shield,
  CreditCard,
  Globe,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Save,
  RotateCcw,
  Check,
  Receipt,
  Clock,
  Wifi,
  Volume2,
  Sun,
  Moon,
  Monitor,
  Hash,
  MapPin,
  Phone,
  Mail,
  Building,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
}

// ─── Reusable Toggle ────────────────────────────────────────────────────────
function Toggle({ enabled, onToggle, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-semibold text-text-main">{label}</p>
        {description && (
          <p className="text-xs text-subtext mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <button
        onClick={onToggle}
        className="shrink-0 transition-transform duration-150 active:scale-90"
        aria-label={`Toggle ${label}`}
      >
        {enabled ? (
          <ToggleRight className="w-9 h-9 text-accent" />
        ) : (
          <ToggleLeft className="w-9 h-9 text-subtext/50" />
        )}
      </button>
    </div>
  );
}

// ─── Reusable Section Card ──────────────────────────────────────────────────
function SettingsCard({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-card border border-white/5 rounded-2xl overflow-hidden shadow-xl"
    >
      <div className="px-6 pt-5 pb-3 border-b border-white/5">
        <h3 className="text-base font-bold text-text-main">{title}</h3>
        {description && (
          <p className="text-xs text-subtext mt-0.5">{description}</p>
        )}
      </div>
      <div className="px-6 py-4 space-y-1">{children}</div>
    </motion.div>
  );
}

// ─── Sidebar Tab Item ───────────────────────────────────────────────────────
function TabItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-accent/10 text-accent shadow-inner'
          : 'text-subtext hover:text-text-main hover:bg-white/5'
      }`}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" />
      <span className="truncate">{label}</span>
      {active && (
        <motion.div
          layoutId="settings-tab-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-accent rounded-r-full"
        />
      )}
      <ChevronRight
        className={`w-4 h-4 ml-auto shrink-0 transition-transform duration-200 ${
          active ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'
        }`}
      />
    </button>
  );
}

// ─── Settings Tabs ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'general', label: 'General', icon: Store },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'printing', label: 'Printing & Receipts', icon: Printer },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'staff', label: 'Staff & Roles', icon: Users },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Globe },
] as const;

type TabId = (typeof TABS)[number]['id'];

// ─── Main Settings Page ─────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [saved, setSaved] = useState(false);

  // Mock toggle states
  const [autoSendKitchen, setAutoSendKitchen] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [emailReceipts, setEmailReceipts] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoPrintReceipt, setAutoPrintReceipt] = useState(true);
  const [printKitchenTicket, setPrintKitchenTicket] = useState(true);
  const [showItemImages, setShowItemImages] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [requirePin, setRequirePin] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [cashPayment, setCashPayment] = useState(true);
  const [cardPayment, setCardPayment] = useState(true);
  const [mobilePayment, setMobilePayment] = useState(false);
  const [giftCards, setGiftCards] = useState(false);
  const [slackIntegration, setSlackIntegration] = useState(false);
  const [inventorySync, setInventorySync] = useState(true);
  const [onlineOrders, setOnlineOrders] = useState(false);
  const [newOrderSound, setNewOrderSound] = useState(true);
  const [readyAlertSound, setReadyAlertSound] = useState(true);
  const [desktopNotif, setDesktopNotif] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // ─── Tab Content Renderers ──────────────────────────────────────────────
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <SettingsCard title="Restaurant Info" description="Your business profile visible on receipts and reports.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <InputField icon={Building} label="Restaurant Name" defaultValue="ProServe Bistro" />
                <InputField icon={Phone} label="Phone" defaultValue="+1 (555) 987-6543" />
                <InputField icon={Mail} label="Email" defaultValue="manager@proserve.com" />
                <InputField icon={MapPin} label="Address" defaultValue="123 Gourmet Ave, Suite 100" />
              </div>
            </SettingsCard>

            <SettingsCard title="Order Workflow" description="Configure how orders flow through the system.">
              <Toggle
                enabled={autoSendKitchen}
                onToggle={() => setAutoSendKitchen(!autoSendKitchen)}
                label="Auto-Send to Kitchen"
                description="Automatically route orders to KDS after payment."
              />
              <Toggle
                enabled={showItemImages}
                onToggle={() => setShowItemImages(!showItemImages)}
                label="Show Item Images on POS"
                description="Display high-res food photography on menu cards."
              />
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-text-main">Default Tax Rate</p>
                  <p className="text-xs text-subtext mt-0.5">Applied to all items unless overridden.</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  <Hash className="w-4 h-4 text-subtext" />
                  <input
                    type="text"
                    defaultValue="8.25"
                    className="bg-transparent text-text-main text-sm w-14 text-right focus:outline-none"
                  />
                  <span className="text-xs text-subtext">%</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-text-main">Order Timeout</p>
                  <p className="text-xs text-subtext mt-0.5">Mark orders as urgent after this duration.</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  <Clock className="w-4 h-4 text-subtext" />
                  <input
                    type="text"
                    defaultValue="15"
                    className="bg-transparent text-text-main text-sm w-10 text-right focus:outline-none"
                  />
                  <span className="text-xs text-subtext">min</span>
                </div>
              </div>
            </SettingsCard>

            <SettingsCard title="Localization" description="Regional formatting preferences.">
              <SelectField label="Currency" options={['USD ($)', 'EUR (€)', 'GBP (£)', 'CAD (C$)']} />
              <SelectField label="Language" options={['English', 'Spanish', 'French', 'German']} />
              <SelectField label="Date Format" options={['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']} />
              <SelectField label="Time Format" options={['12-hour (AM/PM)', '24-hour']} />
            </SettingsCard>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <SettingsCard title="Theme" description="Customize the look and feel of your POS.">
              <div className="py-3">
                <p className="text-sm font-semibold text-text-main mb-3">Color Mode</p>
                <div className="flex gap-3">
                  {[
                    { id: 'dark', icon: Moon, label: 'Dark' },
                    { id: 'light', icon: Sun, label: 'Light' },
                    { id: 'system', icon: Monitor, label: 'System' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setDarkMode(mode.id === 'dark')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                        (mode.id === 'dark' && darkMode) || (mode.id === 'light' && !darkMode)
                          ? 'bg-accent/10 border-accent/30 text-accent shadow-inner'
                          : 'bg-white/5 border-white/10 text-subtext hover:text-text-main hover:border-white/20'
                      }`}
                    >
                      <mode.icon className="w-4 h-4" />
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="py-3">
                <p className="text-sm font-semibold text-text-main mb-3">Accent Color</p>
                <div className="flex gap-3">
                  {[
                    { color: 'bg-pink-500', name: 'Pink' },
                    { color: 'bg-violet-500', name: 'Violet' },
                    { color: 'bg-blue-500', name: 'Blue' },
                    { color: 'bg-emerald-500', name: 'Emerald' },
                    { color: 'bg-amber-500', name: 'Amber' },
                    { color: 'bg-rose-500', name: 'Rose' },
                  ].map((accent) => (
                    <button
                      key={accent.name}
                      className={`w-10 h-10 rounded-full ${accent.color} border-2 transition-all duration-200 hover:scale-110 ${
                        accent.name === 'Pink'
                          ? 'border-white ring-2 ring-white/20 scale-110'
                          : 'border-transparent'
                      }`}
                      title={accent.name}
                    />
                  ))}
                </div>
              </div>
            </SettingsCard>

            <SettingsCard title="Layout" description="Control display density and visual options.">
              <Toggle
                enabled={compactMode}
                onToggle={() => setCompactMode(!compactMode)}
                label="Compact Mode"
                description="Reduce spacing for more items on screen."
              />
              <Toggle
                enabled={showItemImages}
                onToggle={() => setShowItemImages(!showItemImages)}
                label="Show Item Photos"
                description="Display food images on the POS menu grid."
              />
              <SelectField label="Menu Grid Columns" options={['Auto', '3 Columns', '4 Columns', '5 Columns']} />
              <SelectField label="Font Size" options={['Small', 'Medium (Default)', 'Large']} />
            </SettingsCard>
          </div>
        );

      case 'printing':
        return (
          <div className="space-y-6">
            <SettingsCard title="Receipt Printing" description="Configure receipt output.">
              <Toggle
                enabled={autoPrintReceipt}
                onToggle={() => setAutoPrintReceipt(!autoPrintReceipt)}
                label="Auto-Print Customer Receipt"
                description="Print receipt automatically after order completion."
              />
              <Toggle
                enabled={printKitchenTicket}
                onToggle={() => setPrintKitchenTicket(!printKitchenTicket)}
                label="Print Kitchen Ticket"
                description="Send a ticket to the kitchen printer for each new order."
              />
              <Toggle
                enabled={emailReceipts}
                onToggle={() => setEmailReceipts(!emailReceipts)}
                label="Email Digital Receipt"
                description="Offer customers a digital receipt via email."
              />
            </SettingsCard>

            <SettingsCard title="Receipt Layout" description="Customize what appears on printed receipts.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                <InputField icon={Receipt} label="Receipt Header" defaultValue="ProServe Bistro" />
                <InputField icon={Receipt} label="Receipt Footer" defaultValue="Thank you for dining with us!" />
              </div>
              <SelectField label="Paper Size" options={['80mm (Standard)', '58mm (Narrow)', 'A4 (Full Page)']} />
              <SelectField label="Print Density" options={['Light', 'Normal', 'Bold']} />
            </SettingsCard>

            <SettingsCard title="Connected Printers" description="Manage networked printers.">
              <PrinterRow name="Front Counter" model="Epson TM-T88VI" status="online" />
              <PrinterRow name="Kitchen" model="Star TSP143IV" status="online" />
              <PrinterRow name="Bar" model="Epson TM-T20III" status="offline" />
            </SettingsCard>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <SettingsCard title="Sound Alerts" description="Audio cues for POS events.">
              <Toggle
                enabled={soundEffects}
                onToggle={() => setSoundEffects(!soundEffects)}
                label="Sound Effects"
                description="Play audio on button taps and interactions."
              />
              <Toggle
                enabled={newOrderSound}
                onToggle={() => setNewOrderSound(!newOrderSound)}
                label="New Order Chime"
                description="Alert sound when a new order is placed."
              />
              <Toggle
                enabled={readyAlertSound}
                onToggle={() => setReadyAlertSound(!readyAlertSound)}
                label="Order Ready Bell"
                description="Sound when an order status changes to ready."
              />
              <SelectField label="Alert Volume" options={['Low', 'Medium', 'High']} />
            </SettingsCard>

            <SettingsCard title="System Notifications" description="Desktop and push notification settings.">
              <Toggle
                enabled={orderAlerts}
                onToggle={() => setOrderAlerts(!orderAlerts)}
                label="Order Status Alerts"
                description="Notify when orders change status."
              />
              <Toggle
                enabled={desktopNotif}
                onToggle={() => setDesktopNotif(!desktopNotif)}
                label="Desktop Notifications"
                description="Show browser notifications for incoming orders."
              />
            </SettingsCard>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <SettingsCard title="Accepted Payment Methods" description="Toggle which methods are available at checkout.">
              <Toggle
                enabled={cashPayment}
                onToggle={() => setCashPayment(!cashPayment)}
                label="Cash"
                description="Accept cash payments with change calculation."
              />
              <Toggle
                enabled={cardPayment}
                onToggle={() => setCardPayment(!cardPayment)}
                label="Credit / Debit Card"
                description="Visa, MasterCard, Amex via card terminal."
              />
              <Toggle
                enabled={mobilePayment}
                onToggle={() => setMobilePayment(!mobilePayment)}
                label="Mobile Payment (NFC)"
                description="Apple Pay, Google Pay, and contactless."
              />
              <Toggle
                enabled={giftCards}
                onToggle={() => setGiftCards(!giftCards)}
                label="Gift Cards"
                description="Accept and redeem ProServe gift cards."
              />
            </SettingsCard>

            <SettingsCard title="Tipping" description="Configure tip presets for customers.">
              <div className="py-3">
                <p className="text-sm font-semibold text-text-main mb-3">Quick Tip Presets</p>
                <div className="flex gap-3">
                  {['15%', '18%', '20%', '25%'].map((tip) => (
                    <div
                      key={tip}
                      className="flex-1 text-center py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-text-main"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
              <SelectField label="Default Tip" options={['None', '15%', '18%', '20%']} />
            </SettingsCard>
          </div>
        );

      case 'staff':
        return (
          <div className="space-y-6">
            <SettingsCard title="Staff Accounts" description="Manage team members and their access levels.">
              <StaffRow name="Alex Manager" role="Owner / Admin" status="active" avatar="AM" />
              <StaffRow name="Sarah Chen" role="Floor Manager" status="active" avatar="SC" />
              <StaffRow name="Mike Johnson" role="Server" status="active" avatar="MJ" />
              <StaffRow name="Emily Parker" role="Kitchen Staff" status="inactive" avatar="EP" />
            </SettingsCard>

            <SettingsCard title="Roles & Permissions" description="Define what each role can access.">
              <RoleRow role="Owner / Admin" permissions="Full Access" color="text-accent" />
              <RoleRow role="Floor Manager" permissions="POS, Tables, Kitchen, Reports" color="text-violet-400" />
              <RoleRow role="Server" permissions="POS, Tables, Takeout" color="text-blue-400" />
              <RoleRow role="Kitchen Staff" permissions="Kitchen Display Only" color="text-emerald-400" />
            </SettingsCard>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <SettingsCard title="Access Control" description="PIN and lock settings for the terminal.">
              <Toggle
                enabled={requirePin}
                onToggle={() => setRequirePin(!requirePin)}
                label="Require PIN to Log In"
                description="Staff must enter a 4-digit PIN to access the POS."
              />
              <Toggle
                enabled={autoLock}
                onToggle={() => setAutoLock(!autoLock)}
                label="Auto-Lock Screen"
                description="Lock terminal after 5 minutes of inactivity."
              />
              <SelectField label="Lock Timeout" options={['2 minutes', '5 minutes', '10 minutes', '30 minutes']} />
            </SettingsCard>

            <SettingsCard title="Data & Privacy" description="Manage stored data and compliance.">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-main">Audit Log</p>
                  <p className="text-xs text-subtext mt-0.5">View all system actions and changes.</p>
                </div>
                <button className="text-xs font-semibold text-accent bg-accent/10 px-4 py-2 rounded-xl hover:bg-accent/20 transition-colors">
                  View Logs
                </button>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-main">Export Data</p>
                  <p className="text-xs text-subtext mt-0.5">Download all orders and reports as CSV.</p>
                </div>
                <button className="text-xs font-semibold text-secondary bg-secondary/10 px-4 py-2 rounded-xl hover:bg-secondary/20 transition-colors">
                  Export
                </button>
              </div>
            </SettingsCard>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <SettingsCard title="Connected Services" description="Third-party integrations for your POS.">
              <Toggle
                enabled={slackIntegration}
                onToggle={() => setSlackIntegration(!slackIntegration)}
                label="Slack Notifications"
                description="Post order summaries to a Slack channel."
              />
              <Toggle
                enabled={inventorySync}
                onToggle={() => setInventorySync(!inventorySync)}
                label="Inventory Sync"
                description="Automatically update stock levels after each sale."
              />
              <Toggle
                enabled={onlineOrders}
                onToggle={() => setOnlineOrders(!onlineOrders)}
                label="Online Orders (API)"
                description="Accept orders from a website or third-party delivery."
              />
            </SettingsCard>

            <SettingsCard title="API & Webhooks" description="Developer integration endpoints.">
              <div className="py-3">
                <p className="text-sm font-semibold text-text-main mb-2">API Key</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-subtext tracking-wider overflow-x-auto">
                    pk_live_a9f2c4e1•••••••••••••
                  </div>
                  <button className="text-xs font-semibold text-accent bg-accent/10 px-4 py-2.5 rounded-xl hover:bg-accent/20 transition-colors shrink-0">
                    Reveal
                  </button>
                </div>
              </div>
              <div className="py-3">
                <p className="text-sm font-semibold text-text-main mb-2">Webhook URL</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 font-mono text-xs text-subtext tracking-wider">
                    https://api.proserve.com/webhooks/v1
                  </div>
                  <button className="text-xs font-semibold text-secondary bg-secondary/10 px-4 py-2.5 rounded-xl hover:bg-secondary/20 transition-colors shrink-0">
                    Test
                  </button>
                </div>
              </div>
            </SettingsCard>

            <SettingsCard title="Connection Status" description="Health of active integrations.">
              <IntegrationRow name="KDS Sync" status="connected" icon={Wifi} />
              <IntegrationRow name="Payment Gateway" status="connected" icon={CreditCard} />
              <IntegrationRow name="Cloud Backup" status="connected" icon={Globe} />
              <IntegrationRow name="Analytics Engine" status="syncing" icon={Volume2} />
            </SettingsCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Settings Sidebar */}
      <div className="w-64 shrink-0 bg-card/50 border-r border-white/5 h-full flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-black text-text-main tracking-tight">Settings</h1>
          <p className="text-xs text-subtext mt-1">Manage your POS configuration</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
          {TABS.map((tab) => (
            <TabItem
              key={tab.id}
              icon={tab.icon}
              label={tab.label}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <p className="text-[10px] text-subtext/50 text-center">ProServe POS v2.4.0</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="shrink-0 px-8 py-5 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-card to-transparent">
          <div>
            <h2 className="text-lg font-bold text-text-main">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-subtext mt-0.5">
              {activeTab === 'general' && 'Core business and order settings'}
              {activeTab === 'appearance' && 'Theme, colors, and display preferences'}
              {activeTab === 'printing' && 'Receipt and kitchen ticket setup'}
              {activeTab === 'notifications' && 'Sound and alert configuration'}
              {activeTab === 'payments' && 'Payment methods and tipping'}
              {activeTab === 'staff' && 'Team management and permissions'}
              {activeTab === 'security' && 'PIN, lock, and data security'}
              {activeTab === 'integrations' && 'API, webhooks, and third-party tools'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-subtext hover:text-text-main bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-accent hover:bg-accent/90 px-5 py-2.5 rounded-xl shadow-lg shadow-accent/20 transition-all duration-200 active:scale-95"
            >
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Saved!
                  </motion.span>
                ) : (
                  <motion.span
                    key="save"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Helper Components ──────────────────────────────────────────────────────

function InputField({
  icon: Icon,
  label,
  defaultValue,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-subtext block mb-1.5">{label}</label>
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 focus-within:border-accent/30 transition-colors">
        <Icon className="w-4 h-4 text-subtext shrink-0" />
        <input
          type="text"
          defaultValue={defaultValue}
          className="bg-transparent text-text-main text-sm flex-1 focus:outline-none"
        />
      </div>
    </div>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-sm font-semibold text-text-main">{label}</p>
      <select className="bg-white/5 border border-white/10 text-text-main text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-accent/30 transition-colors appearance-none cursor-pointer pr-8">
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-card text-text-main">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function PrinterRow({ name, model, status }: { name: string; model: string; status: 'online' | 'offline' }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Printer className="w-5 h-5 text-subtext" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-main">{name}</p>
          <p className="text-xs text-subtext">{model}</p>
        </div>
      </div>
      <span
        className={`text-xs font-bold px-3 py-1 rounded-full ${
          status === 'online'
            ? 'bg-emerald-500/10 text-emerald-400'
            : 'bg-red-500/10 text-red-400'
        }`}
      >
        {status === 'online' ? '● Connected' : '● Offline'}
      </span>
    </div>
  );
}

function StaffRow({
  name,
  role,
  status,
  avatar,
}: {
  name: string;
  role: string;
  status: 'active' | 'inactive';
  avatar: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-secondary/30 border border-white/10 flex items-center justify-center text-xs font-bold text-text-main">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-main">{name}</p>
          <p className="text-xs text-subtext">{role}</p>
        </div>
      </div>
      <span
        className={`text-xs font-bold px-3 py-1 rounded-full ${
          status === 'active'
            ? 'bg-emerald-500/10 text-emerald-400'
            : 'bg-subtext/10 text-subtext'
        }`}
      >
        {status === 'active' ? '● Active' : '● Inactive'}
      </span>
    </div>
  );
}

function RoleRow({ role, permissions, color }: { role: string; permissions: string; color: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Shield className={`w-5 h-5 ${color}`} />
        <p className="text-sm font-semibold text-text-main">{role}</p>
      </div>
      <p className="text-xs text-subtext max-w-[200px] text-right">{permissions}</p>
    </div>
  );
}

function IntegrationRow({
  name,
  status,
  icon: Icon,
}: {
  name: string;
  status: 'connected' | 'syncing' | 'error';
  icon: React.ComponentType<{ className?: string }>;
}) {
  const statusMap = {
    connected: { label: '● Connected', cls: 'bg-emerald-500/10 text-emerald-400' },
    syncing: { label: '◉ Syncing', cls: 'bg-amber-500/10 text-amber-400 animate-pulse' },
    error: { label: '● Error', cls: 'bg-red-500/10 text-red-400' },
  };
  const s = statusMap[status];

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-subtext" />
        </div>
        <p className="text-sm font-semibold text-text-main">{name}</p>
      </div>
      <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.cls}`}>{s.label}</span>
    </div>
  );
}
