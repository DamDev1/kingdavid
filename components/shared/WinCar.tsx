import React from "react";

export default function WinCar() {
  return (
    <section className="bg-gray-100 mt-10 px-20 max-md:px-5">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <span className="text-sm text-blue-600 font-bold">Win a Car</span>
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Lamborghini Urus
              </h2>

              <p className="mt-4 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                doloremque saepe architecto maiores repudiandae amet perferendis
                repellendus, reprehenderit voluptas sequi.
              </p>

              <button className="mt-10 cursor-pointer text-white bg-blue-600 py-3 px-4 rounded-md">Learn More</button>
            </div>
          </div>

          <div>
            <img
              src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/urus/2022/08_19_urus_perf/gate_urus_og.jpg"
              className="rounded"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
