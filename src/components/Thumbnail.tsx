export const Thumbnail = ({ thumbnail, active }: { thumbnail: string; active: boolean }) => {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 grayscale hover:grayscale-0 transition-all duration-700">
      <img 
        src={thumbnail} 
        alt="" 
        className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
          active ? 'scale-110 grayscale-0' : 'scale-100 group-hover:scale-105'
        }`} 
      />
      <div className={`absolute inset-0 bg-accent/5 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};