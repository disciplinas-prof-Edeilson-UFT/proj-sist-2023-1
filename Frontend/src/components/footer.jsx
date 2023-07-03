export default function Footer() {
    return (
      <footer className="bg-gray-800 mt-8 py-4  text-white">
        <div className="container mx-auto px-4">
          
          <div className="flex justify-between items-right">
            <p className="text-gray-300">Email: lisense@mail.com</p>
            <p className="text-gray-300">Contato: 3692-1222</p>
          </div>

          <div className="flex justify-center items-center space-x-4 mb-4">
            <a href="/Terms" className="text-gray-300 hover:text-white">Termos de Uso</a>
            <a href="/Privacy" className="text-gray-300 hover:text-white">Política de Privacidade</a>
            <a href="/Contributors" className="text-gray-300 hover:text-white">Desenvolvedores</a>
          </div>
          
          <p className="text-center mt-4">&copy; {new Date().getFullYear()} Todos os direitos reservados. Universidade Federal do Tocantins (UFT)</p>
        </div>
      </footer>
    );
  }
  