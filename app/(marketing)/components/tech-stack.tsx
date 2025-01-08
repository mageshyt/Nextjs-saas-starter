import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Icons } from "@/utils/icons-constants";

const FeaturesOrbitCircle = () => {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-500/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Build Fast
      </span>
      {/* Inner Circles */}
      <OrbitingCircles iconSize={40} radius={80}>
        <Icons.bun />
        <Icons.nextJs />
        <Icons.superbase/>
      </OrbitingCircles>

      {/* Outer Circles */}

      <OrbitingCircles reverse iconSize={40} speed={2} radius={160}>
        <Icons.prisma />
        <Icons.typescript/>
        <Icons.docker />
      </OrbitingCircles>
    </div>
  );
}

export default FeaturesOrbitCircle;


