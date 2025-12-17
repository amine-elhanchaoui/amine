
import { useEffect, useState } from "react";

function Inscription() {
  const [formData, setFormData] = useState({
    identifiant: "",
    motDePasse: "",
    dateNaissance: "",
    ville: "Casablanca",
    genre: "",
    loisirs: [],
    photo: null,
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(
    ()=>{
      document.title=`${formData.identifiant} ${formData.dateNaissance} ${formData.ville}`
    },[formData.identifiant,formData.dateNaissance,formData.ville]
  )

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        loisirs: checked
          ? [...prev.loisirs, value]
          : prev.loisirs.filter((loisir) => loisir !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        photo: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Formulaire d'inscription</h2>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="mx-auto p-4 border rounded shadow-sm bg-light"
          style={{ maxWidth: "500px" }}
        >
          <div className="mb-3">
            <label className="form-label">Identifiant</label>
            <input
              type="text"
              name="identifiant"
              className="form-control"
              value={formData.identifiant}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              name="motDePasse"
              className="form-control"
              value={formData.motDePasse}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date de naissance</label>
            <input
              type="date"
              name="dateNaissance"
              className="form-control"
              value={formData.dateNaissance}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ville</label>
            <select
              name="ville"
              className="form-select"
              value={formData.ville}
              onChange={handleChange}
            >
              <option value="Casablanca">Casablanca</option>
              <option value="Rabat">Rabat</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Fès">Fès</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Genre</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="genre"
                value="Homme"
                onChange={handleChange}
              />
              <label className="form-check-label">Homme</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="genre"
                value="Femme"
                onChange={handleChange}
              />
              <label className="form-check-label">Femme</label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Loisirs</label>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                name="loisirs"
                value="Sport"
                onChange={handleChange}
              />
              <label className="form-check-label">Sport</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                name="loisirs"
                value="Lecture"
                onChange={handleChange}
              />
              <label className="form-check-label">Lecture</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                name="loisirs"
                value="Musique"
                onChange={handleChange}
              />
              <label className="form-check-label">Musique</label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Photo</label>
            <input
              type="file"
              name="photo"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            S'inscrire
          </button>
        </form>
      ) : (
        <div className="text-center mt-5">
          <h3 className="text-success">✅ Inscription réussie !</h3>
          <p className="mt-3">
            Je suis <strong>{formData.identifiant}</strong>, né le{" "}
            <strong>{formData.dateNaissance}</strong> à{" "}
            <strong>{formData.ville}</strong> et mes loisirs sont :{" "}
            <strong>{formData.loisirs.join(", ")}</strong>.
          </p>
          {formData.photo && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="profil"
                className="img-thumbnail rounded"
                style={{ width: "150px" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Inscription;
