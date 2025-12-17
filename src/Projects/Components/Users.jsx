import { useApiJson } from "./Api";

export default function Users() {
 const users = useApiJson('https://dummyjson.com/users')

  return (
    <div className="container mt-4">
      <div className="row g-3">

        {users.map((user) => (
          <div className="col-md-3" key={user.id}>
            <div className="card text-center w-100">
              <div className="card-body w-100">

                <img
                  src={user.image}
                  alt={user.firstName}
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />

                <h6 className="card-title">
                  {user.firstName} {user.lastName}
                </h6>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
