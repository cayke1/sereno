import Logo from "@/components/ui/Logo";
import { Heart, Mail, PhoneCall } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Plataforma",
      links: [
        { name: "Recursos", href: "/#features" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Preços", href: "/#" },
        { name: "Depoimentos", href: "/#" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { name: "Ajuda", href: "/#" },
        { name: "Contato", href: "/#" },
        { name: "Privacidade", href: "/privacy-policy" },
        { name: "Termos", href: "/use-terms" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { name: "Sobre nós", href: "/#about" },
        { name: "Blog", href: "/#" },
        { name: "Carreiras", href: "/#" },
        { name: "Parcerias", href: "/#" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-border pt-12 pb-6">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="mt-4 text-muted-foreground max-w-md">
              Transformando o acompanhamento da saúde mental com uma plataforma
              serena, intuitiva e humana para profissionais e pacientes.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="mailto:contato@sereno.com"
                className="text-foreground/70 hover:text-mint-600 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+5511999999999"
                className="text-foreground/70 hover:text-mint-600 transition-colors"
              >
                <PhoneCall size={20} />
              </a>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-medium text-foreground mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-mint-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Sereno. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2 md:mt-0">
            Feito com <Heart size={14} className="text-red-500 fill-red-500" />{" "}
            para profissionais de saúde mental
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
