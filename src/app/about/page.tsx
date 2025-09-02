import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1 p-4 md:p-6 lg:p-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-headline font-bold text-primary">
                    About MediVerse
                </h1>
                <p className="text-muted-foreground mt-2">
                    Our Mission to Simplify Healthcare
                </p>
            </div>
          
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Info className="w-8 h-8 text-primary" />
                        <CardTitle className="font-headline">Your Health, Simplified</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-lg">
                    <p className="text-muted-foreground">
                        Manage appointments, track orders, and gain valuable health insights, all in one place.
                    </p>
                    <p>
                        Our platform is designed with a user-friendly and intuitive interface to encourage active participation in managing your health. We believe that technology can bridge the gap between patients and healthcare providers, making quality care more accessible and manageable for everyone.
                    </p>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
