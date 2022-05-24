
function Livre(titre="" ,  genre = "",  auteur = "",  lu = false,  dateLecture = "") {
  this.titre = titre;
  this.genre = genre;
  this.auteur = auteur;
  this.lu = lu;
  this.dateLecture = (dateLecture.length !=0) ? new Date(dateLecture) : null;
  
  this.toString = function () {     
     return `${this.titre}, ${this.genre}, ${this.auteur}, ${(this.lu)?"Déjà lu":"Non lu"}, ${(this.lu)? this.dateLecture.toLocaleDateString():null}` 
    
  }

  this.convertirJSON = function () {
    return JSON.stringify(this)
  }

}


function ListeLivres(liste=[]) {
  this.nbLivresLus = 0;
  this.nbLivreNonLus = 0;
  this.livreSuivant = new Livre();
  this.livreEnCours = new Livre();
  this.dernierLivre =new Livre();
    

  if (!liste instanceof Array) liste = []; 
  this.listes = liste ;


  if (liste.length > 0) {
    for (const liv of this.listes) {
      if (liv.lu) this.nbLivresLus++;
      else this.nbLivreNonLus++;
    }

    for (const liv of this.livres) {
      if (!liv.lu) {
        this.livreSuivant = liv;
        break;
      }
    }
  }

}


ListeLivres.prototype.ajouter = function (livre) {
   
  if (!livre instanceof Livre)
     throw "Erreur. Ajout impossible. On ne peut ajouter que des objets Livre";
  else
    {this.listes.push(livre);
      if (livre.lu) this.nbLivresLus++;
      else this.nbLivreNonLus++;
     
      if (this.listes.length == 1) 
            this.livreSuivant = livre;
    }
  
};

ListeLivres.prototype.commencerLivreSuivant = function () {
  
  this.livreEnCours = this.livreSuivant;
  for (const liv of this.listes) {
    if (!liv.lu) {
      this.livreSuivant = liv;
      break;
    }
  }
};

ListeLivres.prototype.terminerLivreEnCours = function () {
  let livre = this.livreEnCours;
  livre.lu = true;
  livre.dateLecture = new Date()

  this.dernierLivre = livre;
  this.nbLivresLus ++;
  this.nbLivreNonLus--;
  this.commencerLivreSuivant();
};

ListeLivres.prototype.saveJson =  function () {
  return JSON.stringify(this.listes)
}


 ListeLivres.prototype.rechercher = function (titre) {
 
   for (const livre of this.listes) {
     if(livre.titre === titre)
      return livre
    
   }
   return null;
 } 
 
 ListeLivres.prototype.findAuteur = function (auteur) {

  const tab = []
  for (const livre of this.listes) {
    if(livre.auteur === auteur)
     tab.push(livre)
   
  }
  return tab;
} 
 
 ListeLivres.prototype.supprimer = function (titre) {
   const liv = this.rechercher(titre)
   if (liv != null ){
     let indice = this.listes.indexOf(liv)
     return this.listes.splice(indice,1)
     
   }
   else
      return null;
 }


let bib = new ListeLivres();



for (let i = 0; i < 20; i++) {
  let tit = "Titre"+(Math.random()*100+1).toFixed(0)
  let gen = "G"+(Math.random()*10+1).toFixed(0)
  let aut = "Auteur"+(Math.random()*20+1).toFixed(0)

  let livre = new Livre(titre=tit, genre = gen, auteur = aut);
  bib.ajouter(livre)
}


console.log("Affichage biblio:")
for (const livre of bib.listes) {
  console.log("\tLivre :" + livre)
}

bib.commencerLivreSuivant()

console.log("............Après une semaine...........")

bib.terminerLivreEnCours()


console.log("Affihage biblio:")
for (const livre of bib.listes) {
  console.log("\tLivre :" + livre)
}



const liv1 = new Livre(titre = "Titre1", genre="G1", auteur = "nfn",lu=true,dateLecture="2022-05-23")
console.log(liv1.convertirJSON())
bib.ajouter(liv1)



let tableBiblio=document.getElementsByClassName("table-data");


for(let i=0;i<tableBiblio.length;i++){

  let data=tableBiblio[i].children;

  for(let j=0;j<data.length;j++) 
  {
    if(data[j].className==="titre")
    {
      data[j].textContent=bib.listes[i].titre;
    }
    else if(data[j].className==="genre")
      data[j].textContent=bib.listes[i].genre;

    else if(data[j].className==="auteur")
      data[j].textContent=bib.listes[i].auteur;

    else if(data[j].className==="dejalu")
      data[j].textContent=bib.listes[i].lu;

    else if(data[j].className==="datelu")
      data[j].textContent=bib.listes[i].dateLecture;
      console.log(j);

  }
}