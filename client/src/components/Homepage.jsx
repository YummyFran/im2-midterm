import BlogList from "./BlogList";
import Header from "./Header";

const Homepage = () => {
  const blogs = [
    {
      title: "Corruption",
      author: "Jashen Loberanes",
      description: "Corruption in the Philippines is rising!",
    },
    {
      title: "Corruption",
      author: "Jashen Loberanes",
      description: "Corruption in the Philippines is rising!",
    },
    {
      title: "Corruption",
      author: "Jashen Loberanes",
      description: "Corruption in the Philippines is rising!",
    },
    {
      title: "Corruption",
      author: "Jashen Loberanes",
      description: "Corruption in the Philippines is rising!",
    },
    {
      title: "Corruption",
      author: "Jashen Loberanes",
      description: "Corruption in the Philippines is rising!",
    },
    {
      title: "Corruption",
      author: "Jashen Loberanes",
      description: "Corruption in the Philippines is rising!",
    },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto px-12 py-12">
        <BlogList blogs={blogs} />
      </div>
      <button className="fixed bottom-10 right-10 bg-red-400 text-white font-bold py-3 px-6 rounded-full shadow-lg">
        +
      </button>
    </>
  );
};

export default Homepage;
