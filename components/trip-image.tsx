import Image from "next/image";

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Images = ({ images }: { images: string[] }) => {
  const randomImages = [
    "/random1.jpg",
    "/random2.jpg",
    "/random3.jpg",
    "/random4.jpg",
  ];
  shuffleArray(randomImages);

  const getRandomImage = (index: number) => {
    if (images && images[index]) {
      return images[index];
    } else {
      const randomIndex = index % randomImages.length;
      return randomImages[randomIndex];
    }
  };

  return (
    <div className="px-5 py-5">
      {images && (
        <>
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 xl:col-span-6">
              <div className="grid grid-cols-12 gap-4 lg:gap-6">
                <div className="col-span-12 sm:col-span-6 xl:col-span-12">
                  <a
                    className="link property-gallery"
                    // href="/img/tour-details-img-1.jpg"
                  >
                    <Image
                      alt="image"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl"
                      style={{ color: "transparent" }}
                      src={getRandomImage(0)}
                    />
                  </a>
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-12 relative">
                  <a
                    className="link property-gallery"
                    // href="/img/tour-details-img-2.jpg"
                  >
                    <Image
                      alt="image"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl"
                      style={{ color: "transparent" }}
                      src={getRandomImage(1)}
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-6">
              <div className="grid grid-cols-12 gap-4 lg:gap-6">
                <div className="col-span-12 sm:col-span-6 xl:col-span-12">
                  <a
                    className="link property-gallery"
                    // href="/img/tour-details-img-1.jpg"
                  >
                    <Image
                      alt="image"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl"
                      style={{ color: "transparent" }}
                      src={getRandomImage(2)}
                    />
                  </a>
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-12 relative">
                  <a
                    className="link property-gallery"
                    // href="/img/tour-details-img-2.jpg"
                  >
                    <Image
                      alt="image"
                      width={610}
                      height={288}
                      decoding="async"
                      data-nimg="1"
                      className="w-full rounded-2xl"
                      style={{ color: "transparent" }}
                      src={getRandomImage(3)}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Images;
