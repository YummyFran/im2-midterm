import BlogList from "./BlogList";
import Header from "./Header";

const Homepage = ({ logOut }) => {
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
      <Header logOut={logOut}/>
      <div className="container mx-auto px-12 py-12">
        <BlogList blogs={blogs} />
      </div> 
      <button className="fixed bottom-10 right-10 bg-accent-gradient text-white font-bold rounded-full shadow-lg w-15 h-15">
        +
      </button>
    </>
  );
};

export default Homepage;
