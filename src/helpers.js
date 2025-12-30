function copierTexte(texte) {
    const textArea = document.createElement("textarea");
    textArea.value = texte;
    document.body.appendChild(textArea);
    textArea.select(); // Sélectionne le texte

    try {
        document.execCommand('copy'); // Exécute la commande de copie
        alert('Lien copié avec success !');
    } catch (err) {
        console.error('Impossible de copier avec success : ', err);
    }
    document.body.removeChild(textArea);
}





export {
    copierTexte
};