const WelcomeUpdates = () => {
  return (
    <main className="bg-lighter px-8 py-12 text-dark md:px-col-inner md:py-20 2xl:py-32">
      <div className="mx-auto max-w-screen-2xl space-y-8 md:space-y-12 2xl:space-y-16">
        <h1 className="font-serif text-4xl font-bold leading-relaxed tracking-wider sm:text-5xl lg:text-5xl xl:text-6xl 3xl:text-7xl">
          Welcome!
        </h1>

        <div className="prose prose-lg marker:text-dark">
          <p>
            Your subscription to Yogesh Samsi&apos;s updates has been
            successfully confirmed.
          </p>
          <p>
            You are now officially part of a community that will receive timely
            information on:
          </p>
          <ul>
            <li>
              <strong>Upcoming Performances: </strong>
              <span>
                Keep up with Yogesh Samsi&apos;s schedule - concerts and
                workshops.
              </span>
            </li>
            <li>
              <strong>Online Presence: </strong>
              <span>
                Stay informed about Yogesh Samsi&apos;s latest videos on{" "}
                <a href="https://youtube.com/@yogeshsamsiofficial">
                  YouTube @YogeshSamsiOfficial
                </a>{" "}
                and updates on{" "}
                <a href="https://instagram.com/yogesh.samsi">
                  Instagram @Yogesh.Samsi.
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default WelcomeUpdates
