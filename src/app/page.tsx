import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="font-poppins">
      <p className="text-primary-700">HAHAHAHA</p>
      <div className="flex justify-center items-center gap-4">
        <Button variant="default" size="sm">Small</Button>
        <Button variant="default" size="default">Medium</Button>
        <Button variant="default" size="lg">Large</Button>
      </div>
      <div className="flex justify-center items-center gap-4 mt-5">
        <Button size="sm" disabled>Small</Button>
        <Button size="default" disabled>Medium</Button>
        <Button size="lg" disabled>Large</Button>
      </div>
      <div className="flex justify-center items-center gap-4 mt-5">
        <Button variant="secondary" size="sm">Small</Button>
        <Button variant="secondary" size="default">Medium</Button>
        <Button variant="secondary" size="lg">Large</Button>
      </div>
      <div className="max-w-3xl mx-auto mt-5">
        <h1 className="text-heading-1">Transform Your Home</h1>
        <h2 className="text-heading-2">Professional Cleaning Services</h2>
        <h3 className="text-heading-3">About Our Team</h3>
        <h4 className="text-heading-4">Service Features</h4>
        <p className="text-subtitle">Your trusted cleaning service platform</p>
        <p className="text-body">Regular body text for content</p>
        <p className="text-caption">Last updated 2 hours ago</p>
        <p className="text-label">FEATURED SERVICE</p>
      </div>
    </div>
  );
}
