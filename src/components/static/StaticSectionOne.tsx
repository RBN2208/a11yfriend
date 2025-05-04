import SectionWrapper from '@/src/components/layout/SectionWrapper';
import Anchor from '@/src/components/common/Anchor';

export default async function StaticSectionOne() {
  const headingId = "static-hero-heading"
  return (
    <SectionWrapper bgClass={"bg-blue-900"} linkedHeading={headingId}>
      <div className="flex gap-4 items-center flex-col-reverse md:flex-row text-white">
        <div className="flex flex-col gap-4">
          <h1 id={headingId} className="text-2xl font-bold mb-3">
            Aceso: Your tool for digital accessibility
          </h1>
          <p>
            Whether you need a quick test or want to conduct a more in-depth analysis of
            your website's accessibility, Aceso offers you all the tools you need to
            optimize your digital accessibility.
          </p>

          <p>With automated tests and detailed manual reviews, you'll always stay up to date.</p>
          <Anchor
            label="Try now!"
            url="/register"
            className="border-2 border-white p-2 px-4 rounded-md w-max hover:bg-white hover:text-blue-900 hover:no-underline transition-all duration-200"
          />
        </div>
        <div>
          <img aria-hidden={true}
               src="/hero-image.png"
               alt=""
          />
        </div>
      </div>
    </SectionWrapper>
  )
}
