"use client";

import { useMemo, useState, type ReactNode } from "react";


// #region Types

type TruckStatus = "Open today" | "Upcoming";

type Truck = {
  name: string;
  cuisine: string;
  status: TruckStatus;
  location: string;
  hours: string;
  menu: string[];
  highlight: string;
};

// #endregion







// #region Demo Data

const trucks: Truck[] = [
  {
    name: "Big Papa’s BBQ",
    cuisine: "BBQ",
    status: "Open today",
    location: "Downtown Springfield",
    hours: "11:00 AM – 2:00 PM",
    menu: ["Brisket Sandwich", "Pulled Pork Bowl", "Mac & Cheese Cup"],
    highlight: "Great for lunch crowds and catering.",
  },
  {
    name: "Tacos El Sol",
    cuisine: "Mexican",
    status: "Open today",
    location: "Near the Capitol Complex",
    hours: "12:00 PM – 6:00 PM",
    menu: ["Street Tacos", "Burritos", "Quesadillas"],
    highlight: "Fast service, easy walk-up ordering.",
  },
  {
    name: "Rolling Dough Pizza",
    cuisine: "Pizza",
    status: "Upcoming",
    location: "Friday Food Truck Night",
    hours: "5:00 PM – 9:00 PM",
    menu: ["Personal Pizzas", "Garlic Knots", "Italian Soda"],
    highlight: "Ideal for evening events and families.",
  },
];

const vendorBenefits = [
  "Free starter listing while the platform is being tested.",
  "Menu, location, hours, and schedule in one shareable page.",
  "Built for mobile customers who just want to know what’s open now.",
];

// #endregion







// #region Helpers

function getStatusBadgeClass(status: TruckStatus) {
  const baseClass = "rounded-full px-3 py-1 text-sm font-medium";

  if (status === "Open today") {
    return `${baseClass} bg-lime-500/20 text-lime-200 ring-1 ring-lime-300/20 shadow-[0_0_14px_rgba(163,230,53,0.18)]`;
  }

  return `${baseClass} bg-sky-400/20 text-sky-200 ring-1 ring-sky-300/20 shadow-[0_0_4px_rgba(163,230,53,0.18)]`;
}

// #endregion








// #region Page

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12 md:gap-13 md:py-20">
        <HeroSection />
        <TruckListingsSection />
        <ExampleProfileSection />
        <VendorBenefitsSection />
        <ContactSection />
      </section>
    </main>
  );
}

// #endregion








// #region Sections

function HeroSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-2xl md:px-10 md:py-16">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">
        SPRINGFIELD, IL • FOUNDLOCAL FOOD TRUCKS
      </p>

      <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
        Find food trucks in Springfield, IL right now.
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
        Menus, locations, hours, and upcoming schedules in one simple place.
        Built to help local food trucks get found by more customers.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="#trucks"
          className="rounded-full bg-orange-400 px-6 py-3 text-center font-semibold text-neutral-950 transition hover:bg-orange-300"
        >
          View demo trucks
        </a>

        <a
          href="#vendors"
          className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
        >
          Join as a vendor
        </a>
      </div>

      <p className="mt-6 text-sm text-neutral-400">
        Demo page only — sample trucks below are examples, not live vendor
        listings yet.
      </p>
    </section>
  );
}

function TruckListingsSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrucks = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return trucks;
    }

    return trucks.filter((truck) => {
      const searchableText = [
        truck.name,
        truck.cuisine,
        truck.status,
        truck.location,
        truck.hours,
        truck.highlight,
        ...truck.menu,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(search);
    });
  }, [searchTerm]);

  return (
    <section id="trucks">
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
            Today’s demo listings
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            What customers would see
          </h2>
        </div>

        <p className="max-w-xl text-neutral-400">
          Search by truck name, cuisine, menu item, or location.
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search BBQ, tacos, pizza, downtown..."
          className="w-full rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-orange-300/60 focus:bg-white/[0.09]"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {filteredTrucks.map((truck) => (
          <TruckCard key={truck.name} truck={truck} />
        ))}
      </div>

      {filteredTrucks.length === 0 && (
        <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-neutral-300">
          No demo trucks match that search yet.
        </p>
      )}
    </section>
  );
}

function ExampleProfileSection() {
  return (
    <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-2 md:p-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
          Example truck profile
        </p>

        <h2 className="mt-2 text-3xl font-bold">One clean page per truck</h2>

        <p className="mt-4 leading-7 text-neutral-300">
          Each vendor gets a simple profile that can be shared on Instagram,
          Facebook, Google Business, flyers, QR codes, or event pages.
        </p>
      </div>

      <div className="rounded-2xl bg-neutral-900 p-5">
        <h3 className="text-2xl font-bold">Big Papa’s BBQ</h3>
        <p className="mt-1 text-orange-200">BBQ • Springfield, IL</p>

        <div className="mt-5 space-y-3 text-sm text-neutral-300">
          <p>
            <span className="font-semibold text-white">Today:</span>{" "}
            Downtown Springfield, 11:00 AM – 2:00 PM
          </p>

          <p>
            <span className="font-semibold text-white">Menu:</span> Brisket
            sandwich, pulled pork bowl, mac & cheese cup
          </p>

          <p>
            <span className="font-semibold text-white">Contact:</span>{" "}
            Catering available through phone, email, or social link.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button className="rounded-full bg-orange-400 px-5 py-2 font-semibold text-neutral-950">
            Get directions
          </button>

          <button className="rounded-full border border-white/15 px-5 py-2 font-semibold text-white">
            Contact truck
          </button>
        </div>
      </div>
    </section>
  );
}

function VendorBenefitsSection() {
  return (
    <section id="vendors" className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
          For vendors
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Get found without managing another complicated app.
        </h2>
      </div>

      <div className="grid gap-4 md:col-span-2">
        {vendorBenefits.slice(0, 2).map((benefit) => (
          <BenefitCard key={benefit}>{benefit}</BenefitCard>
        ))}

        <BenefitCard>
          Shareable profile link for menus, flyers, events, and{" "}
          <span className="font-semibold underline decoration-orange-300/70 underline-offset-4">
            QR codes
          </span>
          .
        </BenefitCard>

        <BenefitCard>{vendorBenefits[2]}</BenefitCard>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="rounded-3xl bg-orange-400/80 p-8 text-neutral-950 md:p-10">
      <h2 className="text-3xl font-bold">Want your truck listed?</h2>

      <p className="mt-3 max-w-2xl text-lg">
        I’m putting together the first few local listings for free while testing
        the idea. If it helps, I can grab your menu, schedule, and details over
        message or stop by briefly when you’re open. Use the button below or
        email directly.
      </p>

      <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center">
        <a
          href="mailto:foundlocalvendors@gmail.com?subject=FoundLocal%20Food%20Truck%20Listing"
          className="inline-block rounded-full bg-neutral-950 px-6 py-3 text-center font-semibold text-white"
        >
          Request a free listing
        </a>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-800">
          Or
        </p>

        <div className="rounded-2xl bg-neutral-950/10 p-4 text-sm">
          <p className="font-bold">Email directly:</p>
          <p className="mt-1">foundlocalvendors@gmail.com</p>

          <p className="mt-3 font-bold">Subject line:</p>
          <p className="mt-1">FoundLocal Food Truck Listing</p>
        </div>
      </div>
    </section>
  );
}

// #endregion








// #region Components

function TruckCard({ truck }: { truck: Truck }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.07]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="rounded-full bg-orange-400/15 px-3 py-1 text-sm font-medium text-orange-200">
          {truck.cuisine}
        </span>

        <span className={getStatusBadgeClass(truck.status)}>
          {truck.status}
        </span>
      </div>

      <h3 className="text-2xl font-bold">{truck.name}</h3>
      <p className="mt-2 text-neutral-300">{truck.highlight}</p>

      <div className="mt-5 space-y-2 text-sm text-neutral-300">
        <p>
          <span className="font-semibold text-white">Location:</span>{" "}
          {truck.location}
        </p>

        <p>
          <span className="font-semibold text-white">Hours:</span>{" "}
          {truck.hours}
        </p>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-white">
          Popular menu items
        </p>

        <ul className="space-y-1 text-sm text-neutral-300">
          {truck.menu.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950">
          Menu
        </button>

        <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white">
          Directions
        </button>
      </div>
    </article>
  );
}

function BenefitCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-neutral-200">{children}</p>
    </div>
  );
}

// #endregion