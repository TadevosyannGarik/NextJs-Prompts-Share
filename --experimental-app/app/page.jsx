import { Feed } from "@components/Feed"

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden"/>
                <span className="orange_gradient text-center">Ai-Powered Prompts</span>
            </h1>
            <p className="desc text-center">
                MementoTopia is an open-source AI prompting tool for modern 
                world to discover, create and share creative prompts
            </p>
            <Feed />
            <p className="gap-3 md:gap-5">Created By Tadevosyan Industries</p>

        </section>
    )
}

export default Home