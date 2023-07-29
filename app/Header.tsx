export const Header = () => {
  return (
    <div className="bg-black p-3 flex flex-col justify-center max-w-xl">
      <div className="flex justify-between">
        <h1 className="text-4xl">Benjamin Rose</h1>
      </div>
      <div className="flex justify-end pt-2">
        <a href="https://www.linkedin.com/in/brose925/">Linkedin</a>
        <p className="px-2"> | </p>
        <a href="/resume.pdf">Resume</a>
        <p className="px-2"> | </p>
        <a href="https://github.com/benjamin-roses">Github</a>
        <p className="px-2"> | </p>
        <s>
          <a href="">Blog</a>
        </s>
      </div>
    </div>
  );
};
