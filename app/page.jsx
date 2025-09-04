import { supabase } from "../lib/supabase";

export const dynamic = "force-dynamic"; // always fetch fresh from DB

export default async function Home() {
  const { data: jobs, error } = await supabase
    .from("public_jobs")
    .select("id,title,company,location,district,state,category,job_type,external_url,created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return (
      <div style={{ color: "red" }}>
        DB error: {error.message}
      </div>
    );
  }

  return (
    <main>
      <h1 style={{ marginBottom: 8 }}>Latest Jobs (AP & Telangana)</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Fetched from Supabase → <code>public_jobs</code>
      </p>

      {!jobs?.length ? (
        <p>No jobs yet. Add a row to <code>public.jobs</code> in Supabase.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {jobs.map((j) => (
            <li key={j.id} style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 16,
              marginBottom: 12
            }}>
              <div style={{ fontWeight: 700 }}>{j.title}</div>
              <div>{j.company} — {j.location}, {j.district}, {j.state}</div>
              <div style={{ fontSize: 12, color: "#666" }}>
                {j.category} • {j.job_type}
              </div>
              {j.external_url && (
                <a href={j.external_url} target="_blank" rel="noreferrer" style={{ fontSize: 14 }}>
                  Apply →
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
