import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-16 md:mt-24">
      <div className="relative">
        <img
          src={assets.bottom_banner_image}
          alt="Bottom Banner"
          className="hidden md:block w-full"
        />

        <div className="hidden md:block absolute top-1/2 right-10 -translate-y-1/2 w-[40%]">
          <h1 className="text-2xl font-semibold mb-6 text-primary">
            Why We Are The Best
          </h1>

          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 mb-5">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-8 h-8 flex-shrink-0"
              />

              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden px-4 py-6">
        <h1 className="text-xl font-semibold mb-4 text-primary">
          Why We Are The Best
        </h1>

        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 mb-4">
            <img src={feature.icon} className="w-8 h-8" />
            <div>
              <h3 className="text-base font-semibold text-primary">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}

        <img
          src={assets.bottom_banner_image_sm}
          alt="Bottom Banner"
          className="w-full mt-4"
        />
      </div>
    </div>
  );
};

export default BottomBanner;
