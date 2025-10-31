export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        {/* Cart Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-16 text-slate-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={`M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z`}
          />
        </svg>
<br/>
        {/* Loading Items */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-slate-300 rounded-full animate-ping" style={{ animationDelay: '0.s', animationDuration: '1.5s' }}></div>
          <div className="w-2 h-2 bg-slate-300 rounded-full animate-ping" style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}></div>
          <div className="w-2 h-2 bg-slate-300 rounded-full animate-ping" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    </div>
  );
}
