import Image from "next/image";
import RegisterForm from "@/components/RegisterForm";

const STEPS = [
  {
    n: "01",
    title: "Тренды и новости",
    text: "AI-агент сканирует инфополе и находит темы, которые уже набирают охваты.",
  },
  {
    n: "02",
    title: "Контент-план",
    text: "Складывает темы в календарь: форматы, площадки, частота и смысл каждой публикации.",
  },
  {
    n: "03",
    title: "Генерация контента",
    text: "Создаёт тексты, хуки, визуалы и сценарии под конкретный формат каждой сети.",
  },
  {
    n: "04",
    title: "Публикация",
    text: "Готовит материалы к выходу и публикует их в нужное время без ручной рутины.",
  },
  {
    n: "05",
    title: "Контроль публикаций",
    text: "Следит, что всё вышло, фиксирует результат и подсказывает, что усилить дальше.",
  },
];

const PLATFORMS = [
  { name: "LinkedIn", hint: "экспертные посты", accent: "#0A66C2" },
  { name: "Telegram", hint: "каналы и короткие дропы", accent: "#2AABEE" },
  { name: "Instagram Reels", hint: "короткие вертикальные ролики", accent: "#E1306C" },
  { name: "Instagram карусели", hint: "серии слайдов", accent: "#F77737" },
  { name: "Threads", hint: "быстрые мысли и треды", accent: "#E8EEF7" },
  { name: "YouTube Shorts", hint: "короткие видео", accent: "#FF0033" },
  { name: "TikTok", hint: "трендовые ролики", accent: "#69C9D0" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#05070b]" />
        <div className="orb left-[-10%] top-[-8%] h-[28rem] w-[28rem] bg-cyan-400/16" />
        <div className="orb right-[-8%] top-[12%] h-[24rem] w-[24rem] bg-amber-400/12" />
        <div className="orb bottom-[8%] left-[30%] h-[22rem] w-[22rem] bg-teal-500/10" />
        <div className="absolute inset-0 grid-fade opacity-70" />
      </div>

      <Header />
      <main>
        <Hero />
        <Pipeline />
        <Platforms />
        <Speaker />
        <Register />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#05070b]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-5">
          <Image
            src="/images/asimo-logo.png"
            alt="ASIMO AI Studio"
            width={190}
            height={44}
            className="logo-blend h-7 w-auto sm:h-10"
            priority
          />
          <div className="h-6 w-px bg-white/15 sm:h-8" />
          <div className="flex items-center gap-2">
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:inline">
              при поддержке
            </span>
            <Image
              src="/images/metabox-logo-final.png"
              alt="MetaBox"
              width={42}
              height={42}
              className="logo-blend h-8 w-8 object-contain sm:h-9 sm:w-9"
            />
          </div>
        </div>
        <a
          href="#register"
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/15"
        >
          Зарегистрироваться
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:pb-28 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-200">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Бесплатный интенсив · мест ограничено
          </div>
          <h1 className="font-display mt-6 max-w-xl text-[clamp(2.1rem,5.4vw,4.4rem)] leading-[1.05] tracking-tight text-white">
            Создание отдела SMM из AI-агентов
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            Соберите AI-команду, которая находит тренды, создаёт контент-план, генерирует контент,
            публикует его и контролирует результат
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Узнайте, как собрать отдел SMM на AI-агентах: от поиска актуальных тем до публикации и
            контроля контента во всех ключевых каналах
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#register"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-200 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(46,233,208,0.28)] transition hover:brightness-105"
            >
              Зарегистрироваться бесплатно
            </a>
            <div className="flex items-center gap-2 text-sm text-amber-200">
              <span className="pulse-dot h-2 w-2 rounded-full bg-amber-400" />
              Осталось 14 мест из 30
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="orb left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/20" />
          <div className="floaty relative mx-auto max-w-md">
            <Image
              src="/images/knot.webp"
              alt=""
              width={460}
              height={500}
              className="logo-blend mx-auto h-auto w-[78%] drop-shadow-[0_0_50px_rgba(46,233,208,0.25)]"
              priority
            />
            <div className="glass absolute -left-2 top-8 rounded-2xl px-3 py-2 text-xs text-slate-200 sm:left-0">
              Агент трендов
            </div>
            <div className="glass absolute -right-1 top-1/3 rounded-2xl px-3 py-2 text-xs text-slate-200 sm:right-2">
              Контент-план
            </div>
            <div className="glass absolute bottom-16 left-4 rounded-2xl px-3 py-2 text-xs text-slate-200">
              Публикация
            </div>
            <div className="glass absolute bottom-6 right-6 rounded-2xl px-3 py-2 text-xs text-amber-100">
              Контроль 24/7
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">механика</p>
        <h2 className="font-display mt-3 text-3xl leading-tight text-white sm:text-4xl">
          Как работает AI-отдел SMM
        </h2>
        <p className="mt-4 text-slate-400">
          Пять агентов закрывают цикл целиком — от идеи до проверки, что контент действительно вышел.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-5">
        {STEPS.map((step, index) => (
          <article key={step.n} className="glass relative overflow-hidden rounded-3xl p-5">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-sm text-cyan-300">{step.n}</span>
              <StepIcon index={index} />
            </div>
            <h3 className="text-base font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StepIcon({ index }: { index: number }) {
  const icons = [
    <path key="1" d="M4 12h4l2-6 4 12 2-6h4" />,
    <path key="2" d="M7 4h10M7 12h10M7 20h6" />,
    <path key="3" d="M12 4v16M8 8h8M8 16h8" />,
    <path key="4" d="M5 12h14M12 5l7 7-7 7" />,
    <path key="5" d="M5 12.5 9.5 17 19 7.5" />,
  ];
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-200" fill="none" stroke="currentColor" strokeWidth="1.7">
      {icons[index]}
    </svg>
  );
}

function Platforms() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">каналы</p>
        <h2 className="font-display mt-3 text-3xl leading-tight text-white sm:text-4xl">
          Для каких площадок
        </h2>
        <p className="mt-4 text-slate-400">
          AI-агенты создают и адаптируют контент под формат каждой площадки — не копируют один пост везде.
        </p>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PLATFORMS.map((platform) => (
          <article
            key={platform.name}
            className="glass flex items-center gap-4 rounded-2xl px-4 py-4"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: `${platform.accent}22`, color: platform.accent }}
            >
              <PlatformMark name={platform.name} />
            </span>
            <div>
              <h3 className="font-medium text-white">{platform.name}</h3>
              <p className="text-xs text-slate-400">{platform.hint}</p>
            </div>
          </article>
        ))}
        <article className="glass flex items-center rounded-2xl px-4 py-4 text-sm text-slate-300 lg:col-span-1">
          Один отдел — все ключевые форматы короткого и экспертного контента.
        </article>
      </div>
    </section>
  );
}

function PlatformMark({ name }: { name: string }) {
  if (name === "LinkedIn") {
    return <span className="font-display text-sm">in</span>;
  }
  if (name === "Telegram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M21 5 3.6 11.7c-.8.3-.8 1.4.1 1.7l4.4 1.4 1.7 5.3c.2.8 1.3 1 1.8.3l2.4-3 4.6 3.4c.7.5 1.7.1 1.9-.7L22 6.1c.2-.9-.7-1.6-1.5-1.1z" />
      </svg>
    );
  }
  if (name.includes("Instagram")) {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
      </svg>
    );
  }
  if (name === "Threads") {
    return <span className="font-display text-lg">@</span>;
  }
  if (name === "YouTube Shorts") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M9 7.5v9l8-4.5-8-4.5z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M14 4h4l-6 8 7 8h-4l-5-6-5 6H1l7-8L2 4h4l5 6 3-6z" />
    </svg>
  );
}

function Speaker() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-br from-cyan-400/25 via-transparent to-amber-400/25 blur-2xl" />
          <div className="glow-border relative overflow-hidden rounded-[2rem] bg-black">
            <Image
              src="/images/speaker.webp"
              alt="Кирилл Молодой — CEO & Founder ASIMO.BY"
              width={800}
              height={1200}
              className="aspect-[4/5] h-auto w-full object-cover object-[center_12%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">спикер</p>
          <h2 className="font-display mt-3 text-3xl text-white sm:text-5xl">Кирилл Молодой</h2>
          <p className="mt-3 text-lg text-cyan-200">CEO & Founder ASIMO.BY</p>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            Эксперт по внедрению AI-агентов и автоматизации бизнес-процессов. Показывает, как собрать
            рабочий SMM-отдел из агентов, а не набор разрозненных нейросетей.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Внедрение AI-агентов под ключ",
              "Автоматизация контента и сервиса",
              "Связка тренды → план → публикация",
              "Практический разбор без воды",
            ].map((item) => (
              <div key={item} className="glass rounded-2xl px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section id="register" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">регистрация</p>
          <h2 className="font-display mt-3 text-3xl leading-tight text-white sm:text-4xl">
            Зарегистрироваться на бесплатный интенсив
          </h2>
          <p className="mt-4 max-w-md text-slate-400">
            Оставьте заявку — мы свяжемся с вами и пришлём детали участия.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-300">
            {[
              "Разберём архитектуру AI-отдела SMM",
              "Покажем цепочку агентов на живых сценариях",
              "Дадим каркас, который можно собрать после интенсива",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <RegisterForm />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-4">
          <Image src="/images/asimo-logo.png" alt="ASIMO AI Studio" width={150} height={34} className="logo-blend h-8 w-auto" />
          <Image src="/images/metabox-logo-final.png" alt="MetaBox" width={36} height={36} className="logo-blend h-8 w-8 object-contain" />
        </div>
        <p className="text-xs text-slate-500">
          Бесплатный интенсив ASIMO.BY · данные заявок используются только для связи с участниками
        </p>
      </div>
    </footer>
  );
}
