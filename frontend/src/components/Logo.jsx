export default function Logo() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#4f6ef7">
        <path d="M12 2C8 5 6 9 6 13l-3 3 1 3 3-1 3-3c4 0 8-2 11-6-1-5-4-8-9-7z"/>
      </svg>
      <span style={{fontWeight:800,fontSize:"22px"}}>StartKaro</span>
    </div>
  );
}
