async function copierTexte(texte) {
    try {
        await navigator.clipboard.writeText(texte);
        console.log('Texte copié avec succès !');
    } catch (err) {
        console.error('Échec de la copie : ', err);
    }
}





export {
    copierTexte
};