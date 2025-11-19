"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { toast } from "sonner";

const reservationSchema = z.object({
  personnes: z
    .string()
    .regex(/^\d+$/, "Nombre invalide")
    .refine((v) => {
      const n = Number(v);
      return n >= 1 && n <= 20;
    }, "Entre 1 et 20"),
  date: z.string().min(1, "Date requise"), // simple MVP
  heure: z.string().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, "Format HH:mm"),
});

type ReservationValues = z.infer<typeof reservationSchema>;

export function ReservationForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      personnes: "2",
      date: "",
      heure: "19:00",
    },
  });

  const onSubmit = (values: ReservationValues) => {
    setLoading(true);
    try {
      const url = buildWhatsAppUrl({
        personnes: Number(values.personnes),
        date: values.date,
        heure: values.heure,
      });
      if (!url.includes("wa.me/")) {
        toast.error("Numéro WhatsApp invalide. Configurez NEXT_PUBLIC_WHATSAPP_NUMBER.");
        setLoading(false);
        return;
      }
      window.open(url, "_blank");
      toast.success("Redirection vers WhatsApp…");
    } catch {
      toast.error("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="container px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-[var(--font-playfair)] text-3xl md:text-4xl font-bold">
          Réservez votre table
        </h2>
        <p className="mt-3 text-muted-foreground">
          Nous vous confirmerons votre réservation rapidement.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="personnes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de personnes</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={20} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure</FormLabel>
                    <FormControl>
                      <Input type="time" step={1800} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" size="lg" className="mt-2" disabled={loading}>
              Envoyer via WhatsApp / Send via WhatsApp
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
