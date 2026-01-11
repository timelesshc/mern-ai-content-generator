import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "AI-Powered Generation",
    description:
      "Generate high-quality content instantly with our advanced AI technology. Simply provide a prompt, select your tone and category, and let our AI create engaging content tailored to your needs.",
    href: "#",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure & Private",
    description:
      "Your data and generated content are protected with enterprise-grade security. All content remains private and is securely stored with encrypted connections.",
    href: "#",
    icon: LockClosedIcon,
  },
  {
    name: "Continuous Learning",
    description:
      "Our AI models are continuously updated and improved to deliver better results. Benefit from the latest advancements in natural language processing and content generation.",
    href: "#",
    icon: ArrowPathIcon,
  },
];

export default function AppFeatures() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Powerful Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to create amazing content
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            ContentFlow AI provides cutting-edge tools and features to streamline your content creation process. From AI-powered generation to secure storage, we've got you covered.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-400"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-indigo-400"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}