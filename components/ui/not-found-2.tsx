import { Button } from "@/components/ui/button";
import { HomeIcon, CompassIcon } from "lucide-react";

export function NotFoundComponent() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
			{/* Animated background effect */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.8),transparent_50%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
			
			<div className="relative z-10 flex flex-col items-center justify-center px-4">
				{/* 404 Number */}
				<h1 className="font-black text-[12rem] md:text-[16rem] leading-none tracking-tighter bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-2xl">
					404
				</h1>
				
				{/* Description */}
				<p className="mt-4 text-center text-lg md:text-xl text-gray-300 max-w-md">
					The page you're looking for might have been moved or doesn't exist.
				</p>
				
				{/* Buttons */}
				<div className="mt-8 flex flex-col sm:flex-row gap-4">
					<Button 
						asChild 
						size="lg"
						className="bg-white text-black hover:bg-gray-200 font-semibold px-8"
					>
						<a href="/">
							<HomeIcon className="size-5 mr-2" />
							Go Home
						</a>
					</Button>

					<Button 
						asChild 
						size="lg"
						variant="outline"
						className="border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500 font-semibold px-8"
					>
						<a href="/gallery">
							<CompassIcon className="size-5 mr-2" />
							Explore Gallery
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
