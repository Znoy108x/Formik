import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Form } from "@prisma/client";
import { Badge } from "@/shared/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { ArrowRight, Edit, Eye, FileCheck2 } from "lucide-react";

export function FormCard({ form }: { form: Form }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                    <span className="truncate font-bold">{form.name}</span>
                    {form.published && <Badge className="rounded-full">Published</Badge>}
                    {!form.published && <Badge variant={"default"}>Draft</Badge>}
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                    {formatDistance(form.createdAt, new Date(), {
                        addSuffix: true,
                    })}
                    {form.published && (
                        <div className="flex items-center gap-x-4 mt-1">
                            <div className="flex items-center gap-x-1">
                                <Eye className="w-6 h-6 text-muted-foreground" />
                                <span>{form.visits.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-x-1">
                                <FileCheck2 className="w-5 h-5 text-muted-foreground" />
                                <span>{form.submissions.toLocaleString()}</span>
                            </div>
                        </div>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                {form.description || "No description"}
            </CardContent>
            <CardFooter>
                {form.published && (
                    <Button asChild className="w-full mt-2 text-md gap-4 rounded-full">
                        <Link href={`/forms/${form.id}`}>
                            View submissions <ArrowRight />
                        </Link>
                    </Button>
                )}
                {!form.published && (
                    <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4 rounded-full">
                        <Link href={`/builder/${form.id}`}>
                            Edit form <Edit className="size-5" />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}