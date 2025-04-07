const Footer = () => {
    return (
      <footer className="bg-primary text-black text-sm mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-center">
          
          {/* Info om appen */}
          <div>
            <p>ReceptSkålen är ett fiktivt projekt som använder API från TheMealDB.</p>
          </div>
  
          {/* Skapare */}
          <div>
            <p>
              Skapad av <span className="font-semibold">Maria Borglund</span> • 2025
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  