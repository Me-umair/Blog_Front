import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function BlogPage1() {
  const blogs = useSelector((state) => state.user.data.blogs);
  console.log(blogs);
  return (
    <div className="w-screen min-h-full flex justify-center overflow-y-hidden bg-gray-200 px-4 sm:px-0">
      <div className="w-full md:w-[90%] lg:w-[63%] flex flex-col items-center">
        {blogs?.map((blog, i) => (
          <Link
            className="font-roboto rounded bg-white w-full md:w-[90%] mt-2 mx-auto p-3 md:p-4 hover:shadow-md transition-shadow duration-200"
            key={i}
            to={`/blog/${blog?.blogid}`}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1 order-2 md:order-1">
                <h1 className="text-xl md:text-2xl capitalize line-clamp-1 font-bold text-gray-900 mb-1 md:mb-2">
                  {blog.title}
                </h1>
                <p dangerouslySetInnerHTML={{ __html: blog?.description }} className="text-base md:text-lg capitalize line-clamp-2 text-gray-600 mb-2 md:mb-4">
                  
                </p>
              </div>
              <div className="ml-0 md:ml-4 mb-3 md:mb-0 order-1 md:order-2">
                <img
                  src={blog.imageurl}
                  alt="Illustration of a person with glasses and a serene expression, surrounded by a golden halo and floral patterns"
                  className="w-[100%] md:w-28 md:h-28 rounded"
                  width="100"
                  height="100"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogPage1;
