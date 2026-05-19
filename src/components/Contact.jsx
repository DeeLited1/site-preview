import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ clipClass, src }) => (
  <div className={clipClass} style={{ overflow: "hidden", position: "relative", minHeight: "120px" }}>
    <div className="pointer-events-none" style={{ position: "absolute", inset: 0 }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox clipClass="contact-clip-path-1" src="https://res.cloudinary.com/dr3ccbekm/video/upload/v1779128039/fale-bg-02_hnurpp.mp4" />
          <ImageClipBox clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60" src="https://res.cloudinary.com/dr3ccbekm/video/upload/v1779128044/fale-bg-03_zkrg9k.mp4" />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox clipClass="absolute md:scale-125" src="https://res.cloudinary.com/dr3ccbekm/video/upload/v1779128476/about-bg_gxvxjm.mp4" />
          <ImageClipBox clipClass="sword-man-clip-path md:scale-125" src="https://res.cloudinary.com/dr3ccbekm/video/upload/v1779128130/fale-bg-01_bbveug.mp4" />
        </div>

        <div className="flex flex-col items-center text-center">
          <AnimatedTitle
            title="me c<b>o</b>nta do <br /> seu proj<b>e</b>to."
            containerClass="!text-white text-center"
          />

          <a href="https://wa.me/5521998595665" target="_blank" rel="noopener noreferrer">
            <Button title="falar comigo" containerClass="mt-10 cursor-pointer !bg-[#00e5ff]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
