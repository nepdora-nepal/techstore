import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
                <FileQuestion className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
            </p>
            <Button asChild size="lg">
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}
