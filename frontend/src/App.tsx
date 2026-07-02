import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Gauge,
  Menu,
  MessageSquareText,
  MoonStar,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SunMedium,
  Volume2,
  Wifi,
  Wind,
  X,
  Zap,
  type LucideIcon
} from "lucide-react";
import { startTransition, useState } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import { useTracking } from "./hooks/useTracking";
import { sendChatMessage, submitNewsletter } from "./lib/api";
import { newsletterFormSchema, type NewsletterFormValues } from "./schemas/newsletter.schema";

const navItems = [
  { label: "Tính năng", href: "#features" },
  { label: "Trải nghiệm", href: "#showcase" },
  { label: "Thông số", href: "#specs" },
  { label: "Đánh giá", href: "#reviews" },
  { label: "Câu hỏi", href: "#faq" }
];

const featureCards: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: BrainCircuit,
    title: "Điều khiển AI thích ứng",
    description: "Học thói quen sử dụng phòng, dự đoán thay đổi chất lượng không khí và tự điều chỉnh trước khi không gian trở nên ngột ngạt."
  },
  {
    icon: Wind,
    title: "Lọc chuẩn y tế",
    description: "Màng lọc HEPA H13 kết hợp than hoạt tính giúp xử lý bụi mịn, phấn hoa, VOC và mùi sau khi nấu ăn chỉ trong một luồng khí."
  },
  {
    icon: Volume2,
    title: "Chế độ đêm siêu êm",
    description: "Tự giảm tiếng ồn khi phòng đã ổn định, giữ không gian ngủ yên tĩnh, dễ chịu và thoải mái suốt đêm."
  },
  {
    icon: Smartphone,
    title: "Điều khiển từ xa",
    description: "Chuyển nhanh giữa các chế độ Tập trung, Ngủ và Làm sạch nhanh qua điện thoại hoặc tự động hóa theo lịch."
  },
  {
    icon: ShieldCheck,
    title: "Thông tin dễ hiểu cho gia đình",
    description: "Giải thích chất lượng không khí bằng ngôn ngữ đơn giản và cảnh báo khi dị ứng, thú cưng hoặc khói cần được chú ý."
  },
  {
    icon: Zap,
    title: "Vận hành tiết kiệm năng lượng",
    description: "Cân bằng mục tiêu làm sạch với mức tiêu thụ điện, duy trì hiệu quả cao mà không lãng phí năng lượng."
  }
];

const heroStats = [
  { label: "Cài đặt trong", value: "6 phút" },
  { label: "Làm mới khí", value: "4.2 lần/giờ" },
  { label: "Cơ chế vận hành", value: "AI tự động" }
];

const specs = [
  { label: "Diện tích phủ", value: "75 m²", detail: "Phù hợp phòng khách mở, studio và các không gian liên thông." },
  { label: "CADR", value: "520 m³/h", detail: "Làm sạch nhanh khói, phấn hoa và bụi mịn đô thị." },
  { label: "Độ ồn", value: "22 dB", detail: "Chế độ ngủ vận hành êm như thư viện sau khi tắt đèn." },
  { label: "Cảm biến", value: "6 cảm biến", detail: "PM2.5, VOC, xu hướng CO₂, độ ẩm, nhiệt độ và ánh sáng." },
  { label: "Công suất", value: "8-48 W", detail: "Tự tối ưu thời gian chạy để tiết kiệm điện mà vẫn làm sạch hiệu quả." },
  { label: "Kết nối", value: "Wi-Fi 6", detail: "Điều khiển qua app, cập nhật OTA và đồng bộ ngữ cảnh thông minh." }
];

const testimonials = [
  {
    quote:
      "Chế độ AI phát hiện khói nấu ăn trước khi căn phòng trở nên bí bách. Đây là máy lọc đầu tiên khiến tôi cảm thấy nó thật sự chủ động.",
    name: "Minh Anh",
    role: "Quản lý sản phẩm và phụ huynh hai con"
  },
  {
    quote:
      "Tôi làm việc cạnh cửa sổ mở cả ngày. SmartAir Pro giữ phòng làm việc ổn định mà không còn tiếng quạt ồn liên tục như trước.",
    name: "Hoàng Nam",
    role: "Tư vấn thiết kế làm việc từ xa"
  },
  {
    quote:
      "Điều thuyết phục tôi là máy chạy êm và ứng dụng giải thích rất rõ ràng. Tôi không phải đoán máy đang làm gì nữa.",
    name: "Lan Phương",
    role: "Nhà sáng lập studio chăm sóc sức khỏe"
  }
];

const faqs = [
  {
    question: "SmartAir Pro dùng AI như thế nào mà không gây cảm giác bị tự động hóa quá mức?",
    answer:
      "Mô hình AI trên thiết bị chỉ điều chỉnh tốc độ quạt, thời điểm lọc và gợi ý chế độ phù hợp. Bạn vẫn có thể dùng chế độ thủ công và tắt tự động hóa theo từng phòng."
  },
  {
    question: "Máy có phù hợp với nhà nuôi thú cưng và mùi bếp không?",
    answer:
      "Có. Hệ lọc nhiều lớp kết hợp HEPA H13 với lõi than hoạt tính mật độ cao để giảm lông thú, tác nhân dị ứng và các đợt mùi khó chịu sau khi nấu ăn."
  },
  {
    question: "Nếu mất Wi-Fi thì máy có hoạt động không?",
    answer:
      "Có. Cảm biến cục bộ và chế độ tự động vẫn chạy trực tiếp trên thiết bị. Máy giữ lịch gần nhất và đồng bộ lịch sử lên ứng dụng khi kết nối trở lại."
  },
  {
    question: "Bao lâu cần thay lõi lọc?",
    answer:
      "Phần lớn gia đình thay lõi sau khoảng 8 đến 12 tháng. SmartAir Pro ước tính tuổi thọ còn lại dựa trên thời gian chạy thực tế và lượng hạt bụi, không chỉ dựa vào lịch cố định."
  }
];

const sectionMotion = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
} as const;

function App() {
  const { theme, toggleTheme } = useDarkMode();
  const { trackCta } = useTracking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(faqs[0]?.question ?? "");
  const [formValues, setFormValues] = useState<NewsletterFormValues>({
    firstName: "",
    email: ""
  });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState<string>("");

  const handleFieldChange = (field: keyof NewsletterFormValues, value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value
    }));

    if (formState !== "idle") {
      setFormState("idle");
      setFormMessage("");
    }
  };

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = newsletterFormSchema.safeParse(formValues);

    if (!parsed.success) {
      setFormState("error");
      setFormMessage(parsed.error.issues[0]?.message ?? "Vui lòng kiểm tra lại biểu mẫu và thử lại.");
      return;
    }

    setFormState("submitting");
    setFormMessage("");
    trackCta("newsletter_submit", "newsletter");

    try {
      await submitNewsletter({
        email: parsed.data.email,
        firstName: parsed.data.firstName,
        source: "landing-page",
        tags: ["smartair-pro", "launch-list"]
      });

      startTransition(() => {
        setFormValues({
          firstName: "",
          email: ""
        });
      });
      setFormState("success");
      setFormMessage("Bạn đã đăng ký thành công. Chúng tôi sẽ gửi thông tin mở bán và quyền truy cập sớm qua email.");
    } catch (error) {
      setFormState("error");
      setFormMessage(error instanceof Error ? error.message : "Hiện chưa thể lưu email của bạn. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="relative overflow-x-hidden pb-24">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.18),transparent_44%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/65 backdrop-blur-xl dark:bg-slate-950/65">
        <div className="section-shell flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-3" onClick={() => trackCta("header_logo", "header")}>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-500/15 text-teal-600 dark:bg-teal-400/15 dark:text-teal-300">
              <Wind className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">SmartAir Pro</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">Chăm sóc không khí bằng AI cho không gian dễ chịu hơn</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-200 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-teal-600 dark:hover:text-teal-300">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <a
              href="#newsletter"
              className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
              onClick={() => trackCta("header_waitlist", "header")}
            >
              Đăng ký nhận tin
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              type="button"
              aria-label="Mở hoặc đóng menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
              onClick={() => setMobileMenuOpen((currentState) => !currentState)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="border-t border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95 md:hidden"
            >
              <div className="section-shell flex flex-col gap-4 py-5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-base text-slate-700 dark:text-slate-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#newsletter"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-white"
                  onClick={() => {
                    trackCta("mobile_waitlist", "mobile-menu");
                    setMobileMenuOpen(false);
                  }}
                >
                  Đăng ký nhận tin
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="top">
        <section className="section-anchor section-shell grid gap-12 py-16 md:grid-cols-[1.15fr,0.85fr] md:py-24">
          <motion.div {...sectionMotion} className="space-y-8">
            <span className="badge-pill text-sm">
              <Sparkles className="h-4 w-4 text-teal-500" />
              Dành cho phòng ngủ, phòng khách và không gian làm việc tập trung
            </span>

            <div className="space-y-5">
              <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl">
                Không khí trong lành <span className="gradient-text">tự thích ứng trước khi bạn nhận ra thay đổi</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                SmartAir Pro nhận biết bụi mịn tăng đột biến, dự đoán nhịp sinh hoạt trong phòng và tự điều chỉnh bằng AI để từng hơi thở trở nên dễ chịu,
                yên tĩnh và tiết kiệm năng lượng hơn.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#newsletter"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-600"
                onClick={() => trackCta("hero_waitlist", "hero")}
              >
                Đăng ký dùng sớm
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#showcase"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/75 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:border-teal-400 dark:hover:text-teal-300"
                onClick={() => trackCta("hero_showcase", "hero")}
              >
                Xem trải nghiệm sản phẩm
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div key={item.label} className="glass-panel rounded-3xl p-4">
                  <p className="text-sm text-slate-500 dark:text-slate-300">{item.label}</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...sectionMotion} className="relative mx-auto flex max-w-xl items-center justify-center">
            <div className="device-halo absolute inset-10 rounded-full blur-3xl" />
            <div className="glass-panel relative rounded-[2rem] p-5 sm:p-7">
              <img src="/smartair-device.svg" alt="Máy lọc không khí SmartAir Pro" className="w-full max-w-[28rem]" loading="eager" />
              <div className="absolute -left-5 top-8 rounded-2xl border border-white/40 bg-white/85 px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-900/90">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Chất lượng không khí</p>
                <p className="mt-1 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  AQI 12 và đang giảm
                </p>
              </div>
              <div className="absolute -right-5 bottom-10 rounded-2xl border border-white/40 bg-white/85 px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-900/90">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Chế độ tự động</p>
                <p className="mt-1 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
                  <MoonStar className="h-4 w-4 text-indigo-500" />
                  Đã bật chế độ ngủ
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section {...sectionMotion} id="features" className="section-anchor section-shell py-8 md:py-12">
          <SectionHeading
            eyebrow="Lợi ích nổi bật"
            title="Một máy lọc, sáu cách giúp không gian sống thông minh hơn mỗi ngày"
            description="Trải nghiệm được tối ưu theo nhịp sinh hoạt thực tế trong gia đình, từ buổi sáng nhiều phấn hoa đến buổi tối cần làm sạch nhanh sau khi nấu ăn, tiếp khách hoặc chịu ảnh hưởng từ không khí đô thị."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((card) => (
              <article key={card.title} className="glass-panel rounded-[1.75rem] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/12 text-teal-600 dark:bg-teal-400/12 dark:text-teal-300">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-slate-950 dark:text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{card.description}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="showcase" className="section-anchor section-shell py-12 md:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
            <div className="glass-panel rounded-[2rem] p-7">
              <p className="text-sm uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">Trải nghiệm sản phẩm</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Máy lọc hiểu ngữ cảnh, không chỉ thay đổi tốc độ quạt
              </h2>
              <div className="mt-8 space-y-5">
                <ShowcaseRow
                  icon={Gauge}
                  title="Phát hiện"
                  description="Cảm biến thời gian thực theo dõi bụi siêu mịn, tải mùi và nhịp sinh hoạt trong phòng mà không cần làm mới thủ công."
                />
                <ShowcaseRow
                  icon={BrainCircuit}
                  title="Dự đoán"
                  description="Thuật toán thích ứng nhận biết thói quen của bạn và điều chỉnh luồng khí trước giờ họp, ngủ trưa, nấu ăn hoặc thời điểm gia đình trở về."
                />
                <ShowcaseRow
                  icon={CheckCircle2}
                  title="Giải thích"
                  description="Ứng dụng cho biết điều gì đã thay đổi, vì sao máy phản ứng và mất bao lâu để căn phòng ổn định trở lại."
                />
              </div>
              <a
                href="#specs"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-300"
                onClick={() => trackCta("showcase_specs", "showcase")}
              >
                Xem thông số kỹ thuật
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-6">
              <div className="glass-panel rounded-[2rem] p-5 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Trí tuệ không gian</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold text-slate-950 dark:text-white">Điều phối phòng khách</h3>
                  </div>
                  <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-300">
                    Ổn định sau 18 phút
                  </span>
                </div>
                <div className="mt-6 rounded-[1.75rem] bg-slate-950/5 p-4 dark:bg-white/5">
                  <img src="/smartair-device.svg" alt="Mặt trước máy lọc SmartAir Pro" className="mx-auto w-full max-w-[24rem]" />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <StatChip icon={Wifi} label="Kết nối" value="App + OTA" />
                  <StatChip icon={Sparkles} label="Chế độ AI" value="Hiểu ngữ cảnh" />
                  <StatChip icon={MessageSquareText} label="Hướng dẫn" value="Dễ hiểu" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-panel rounded-[1.75rem] p-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Chế độ theo ngữ cảnh</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    <li>Chế độ Tập trung hiển thị xu hướng CO₂ trong những phiên làm việc dài.</li>
                    <li>Chế độ Ngủ giảm tốc độ quạt nhẹ nhàng nhưng vẫn bảo vệ chất lượng không khí suốt đêm.</li>
                    <li>Chế độ Làm sạch nhanh xử lý mùi sau khi nấu ăn và không khí ẩm bí vào ngày mưa.</li>
                  </ul>
                </div>
                <div className="glass-panel rounded-[1.75rem] p-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Chiến lược lõi lọc</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    <li>Tự kiểm tra lực cản và mức sử dụng trước khi đề xuất thay lõi.</li>
                    <li>Theo dõi mùi và hạt bụi riêng biệt để khuyến nghị đúng thời điểm hơn.</li>
                    <li>Giảm vận hành dư thừa bằng cách điều chỉnh thời gian chạy theo sự kiện thực tế trong phòng.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="specs" className="section-anchor section-shell py-12 md:py-16">
          <SectionHeading
            eyebrow="Thông số kỹ thuật"
            title="Làm sạch nhanh, vận hành êm và luôn giải thích rõ ràng"
            description="SmartAir Pro được thiết kế để làm sạch mạnh mẽ mà không biến căn phòng thành một bảng điều khiển phức tạp hay đường hầm tiếng quạt."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="glass-panel rounded-[2rem] p-6">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="rounded-[1.5rem] border border-slate-200/70 bg-white/60 p-5 dark:border-slate-800 dark:bg-slate-900/40">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{spec.label}</p>
                    <p className="mt-2 font-display text-2xl font-semibold text-slate-950 dark:text-white">{spec.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{spec.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">AI đang theo dõi gì</p>
              <div className="mt-6 space-y-4">
                <SignalRow icon={Activity} label="Áp lực bụi mịn" value="PM2.5 + phát hiện tăng đột biến" />
                <SignalRow icon={Gauge} label="Độ thoải mái không khí" value="Độ ẩm, nhiệt độ và xu hướng bí khí" />
                <SignalRow icon={Volume2} label="Ưu tiên độ ồn" value="Học mức quạt êm hơn sau khi trời tối" />
                <SignalRow icon={Smartphone} label="Vòng lặp hành vi" value="Chế độ app, lịch chạy và thao tác thủ công" />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="reviews" className="section-anchor section-shell py-12 md:py-16">
          <SectionHeading
            eyebrow="Đánh giá người dùng"
            title="Thiết kế cho người muốn không khí sạch hơn mà không phải tự đoán"
            description="Các thử nghiệm tại nhà tập trung vào thói quen gia đình, phòng làm việc và không gian đa năng, nơi sự thoải mái nền là yếu tố quan trọng."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="glass-panel rounded-[2rem] p-6">
                <p className="text-base leading-8 text-slate-700 dark:text-slate-200">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-8 border-t border-slate-200/70 pt-5 dark:border-slate-700/70">
                  <p className="font-display text-xl font-semibold text-slate-950 dark:text-white">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="faq" className="section-anchor section-shell py-12 md:py-16">
          <SectionHeading
            eyebrow="Câu hỏi thường gặp"
            title="Những câu hỏi thực tế trước khi đưa SmartAir Pro về nhà"
            description="Mọi nội dung được trình bày rõ ràng, dễ hiểu và hữu ích cho người dùng, thay vì chỉ là các thuật ngữ kỹ thuật hoặc bảng điều khiển phức tạp."
          />
          <div className="mt-10 space-y-4">
            {faqs.map((item) => {
              const isOpen = item.question === openFaq;
              return (
                <article key={item.question} className="glass-panel overflow-hidden rounded-[1.75rem]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenFaq(isOpen ? "" : item.question)}
                  >
                    <span className="font-display text-xl font-semibold text-slate-950 dark:text-white">{item.question}</span>
                    <ChevronDown className={clsx("h-5 w-5 transition", isOpen ? "rotate-180 text-teal-500" : "text-slate-400")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.answer}</div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} id="newsletter" className="section-anchor section-shell py-12 md:py-16">
          <div className="glass-panel rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">Đăng ký nhận tin</p>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  Nhận thông tin ra mắt trước khi SmartAir Pro có mặt tại khu vực của bạn
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
                  Đăng ký danh sách nhận tin sớm để cập nhật đợt hàng đầu tiên, thời gian mở bán tại địa phương và các buổi trải nghiệm sản phẩm. Không spam, chỉ gửi thông tin quan trọng.
                </p>
              </div>

              <form className="grid gap-4" onSubmit={handleNewsletterSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Họ tên</span>
                    <input
                      type="text"
                      value={formValues.firstName ?? ""}
                      onChange={(event) => handleFieldChange("firstName", event.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-teal-500/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</span>
                    <input
                      type="email"
                      required
                      value={formValues.email}
                      onChange={(event) => handleFieldChange("email", event.target.value)}
                      placeholder="nguyenvana@example.com"
                      className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-teal-500/20"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formState === "submitting" ? "Đang lưu đăng ký..." : "Đăng ký nhận tin ra mắt"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p
                  className={clsx(
                    "min-h-6 text-sm",
                    formState === "error" && "text-rose-600 dark:text-rose-300",
                    formState === "success" && "text-emerald-600 dark:text-emerald-300",
                    formState === "idle" && "text-slate-500 dark:text-slate-400"
                  )}
                >
                  {formMessage}
                </p>
              </form>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="section-shell border-t border-slate-200/70 py-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-slate-950 dark:text-white">SmartAir Pro</p>
            <p className="mt-1 max-w-2xl">Không khí sạch nhờ AI cho những không gian làm việc hiệu quả, nghỉ ngơi tốt hơn và luôn dễ chịu khi chất lượng không khí được xử lý chủ động.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-teal-600 dark:hover:text-teal-300">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <ChatWidget
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpen={() => {
          setChatOpen(true);
          trackCta("chat_open", "chatbot");
        }}
        onTrackCta={trackCta}
      />
    </div>
  );
}

function SectionHeading(props: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.2em] text-teal-600 dark:text-teal-300">{props.eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {props.title}
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{props.description}</p>
    </div>
  );
}

function ThemeToggle(props: { theme: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-label="Chuyển giao diện sáng tối"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 transition hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-teal-400 dark:hover:text-teal-300"
      onClick={props.onToggle}
    >
      {props.theme === "dark" ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
    </button>
  );
}

function ShowcaseRow(props: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/60 p-5 dark:border-slate-800 dark:bg-slate-900/35">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-500/12 text-teal-600 dark:bg-teal-400/12 dark:text-teal-300">
          <props.icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-2xl font-semibold text-slate-950 dark:text-white">{props.title}</h3>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{props.description}</p>
    </div>
  );
}

function StatChip(props: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200/70 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/35">
      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
        <props.icon className="h-4 w-4 text-teal-500" />
        <span className="text-sm">{props.label}</span>
      </div>
      <p className="mt-2 font-display text-xl font-semibold text-slate-950 dark:text-white">{props.value}</p>
    </div>
  );
}

function SignalRow(props: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-[1.5rem] border border-slate-200/70 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/35">
      <span className="mt-1 grid h-11 w-11 place-items-center rounded-2xl bg-teal-500/12 text-teal-600 dark:bg-teal-400/12 dark:text-teal-300">
        <props.icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-medium text-slate-950 dark:text-white">{props.label}</p>
        <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{props.value}</p>
      </div>
    </div>
  );
}

type ChatMessage = {
  role: "bot" | "user";
  content: string;
};

function getFallbackSmartAirReply(message: string) {
  const text = message.toLowerCase();

  if (text.includes("giá") || text.includes("bao nhiêu") || text.includes("price")) {
    return "SmartAir Pro dự kiến có giá từ 4.990.000đ. Bạn có thể đăng ký danh sách chờ để nhận thông tin mở bán sớm.";
  }

  if (text.includes("lọc") || text.includes("bụi") || text.includes("pm2.5") || text.includes("hepa")) {
    return "SmartAir Pro dùng bộ lọc HEPA H13 kết hợp than hoạt tính, giúp giảm bụi mịn PM2.5, phấn hoa, mùi nấu ăn và các tác nhân gây dị ứng.";
  }

  if (text.includes("ồn") || text.includes("độ ồn") || text.includes("ngủ")) {
    return "Ở chế độ ngủ, SmartAir Pro hoạt động khoảng 22 dB, phù hợp cho phòng ngủ hoặc không gian cần yên tĩnh.";
  }

  if (text.includes("diện tích") || text.includes("phòng") || text.includes("m2") || text.includes("m²")) {
    return "SmartAir Pro phù hợp cho không gian lên đến khoảng 75m² như phòng khách, phòng ngủ lớn, studio hoặc văn phòng tại nhà.";
  }

  if (text.includes("wifi") || text.includes("app") || text.includes("điện thoại") || text.includes("kết nối")) {
    return "Sản phẩm hỗ trợ Wi-Fi 6, điều khiển qua ứng dụng di động, cập nhật OTA và đồng bộ các ngữ cảnh như Ngủ, Tập trung hoặc Làm sạch nhanh.";
  }

  if (text.includes("bảo hành") || text.includes("warranty")) {
    return "SmartAir Pro dự kiến được bảo hành 12 tháng. Thông tin chi tiết sẽ được gửi khi sản phẩm chính thức mở bán.";
  }

  if (text.includes("ai") || text.includes("thông minh")) {
    return "AI trên SmartAir Pro giúp nhận biết thói quen sử dụng phòng, dự đoán thay đổi chất lượng không khí và tự điều chỉnh tốc độ lọc phù hợp.";
  }

  return "Mình có thể hỗ trợ bạn về giá, bộ lọc, độ ồn, diện tích phòng, kết nối app, bảo hành hoặc chế độ AI của SmartAir Pro.";
}

function ChatWidget(props: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onTrackCta: (label: string, location: string, metadata?: Record<string, string | number | boolean | null>) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      content:
        "Xin chào! Mình là trợ lý SmartAir. Bạn có thể hỏi về giá, bộ lọc, độ ồn, diện tích phòng hoặc tính năng AI."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const quickQuestions = [
    "Giá bao nhiêu?",
    "Máy lọc được bụi PM2.5 không?",
    "Độ ồn khi ngủ thế nào?"
  ];

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();

    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmed
    };

    const nextMessages: ChatMessage[] = [...messages, userMessage];

    setMessages(nextMessages);
    setInputValue("");
    setIsSending(true);

    props.onTrackCta("chat_message_sent", "chatbot", {
      messageLength: trimmed.length
    });

    try {
      const reply = await sendChatMessage({
        message: trimmed,
        history: messages.slice(-8)
      });

      setMessages([
        ...nextMessages,
        {
          role: "bot",
          content: reply
        }
      ]);
    } catch (error) {
      console.error("Chatbot API error:", error);

      setMessages([
        ...nextMessages,
        {
          role: "bot",
          content: getFallbackSmartAirReply(trimmed)
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleQuickQuestionClick = (question: string) => {
    setShowQuickQuestions(false);
    void sendMessage(question);
  };

  const handleToggleChat = () => {
    if (props.isOpen) {
      props.onClose();
      return;
    }

    setShowQuickQuestions(true);
    props.onOpen();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {props.isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="flex h-[520px] w-[360px] max-h-[calc(100vh-7rem)] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-center justify-between bg-teal-500 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-semibold">Trợ lý SmartAir</p>
                  <p className="text-xs text-white/80">
                    {isSending ? "Đang trả lời..." : "Đang hoạt động"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Đóng chatbot"
                className="grid h-9 w-9 place-items-center rounded-full text-white/90 transition hover:bg-white/15"
                onClick={props.onClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4 text-sm leading-6 dark:bg-slate-900">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={clsx(
                    "max-w-[88%] rounded-2xl px-4 py-3",
                    message.role === "bot"
                      ? "mr-auto border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      : "ml-auto bg-slate-950 text-white dark:bg-teal-500 dark:text-slate-950"
                  )}
                >
                  {message.content}
                </div>
              ))}

              {isSending ? (
                <div className="mr-auto max-w-[88%] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                  Đang trả lời...
                </div>
              ) : null}
            </div>

            <div className="border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
              {showQuickQuestions ? (
                <>
                  <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    Gợi ý câu hỏi:
                  </p>

                  <div className="mb-3 grid gap-2">
                    {quickQuestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        disabled={isSending}
                        className="truncate rounded-full border border-slate-200 px-3 py-2 text-left text-xs font-medium text-slate-600 transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300"
                        onClick={() => handleQuickQuestionClick(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}

              <form
                className="flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage(inputValue);
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  disabled={isSending}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder={isSending ? "Vui lòng chờ phản hồi..." : "Nhập nội dung thắc mắc..."}
                  className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-teal-500/20"
                />

                <button
                  type="submit"
                  disabled={isSending || !inputValue.trim()}
                  className="grid h-10 w-10 place-items-center rounded-full bg-teal-500 text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Gửi tin nhắn"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-slate-800 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400"
        onClick={handleToggleChat}
      >
        {props.isOpen ? <X className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        {props.isOpen ? "Đóng trợ lý" : "Hỏi SmartAir"}
      </button>
    </div>
  );
}

export default App;
