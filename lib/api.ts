export async function postSequence(apiBase: string, files: File[], seqLen: number, totalFilesSeen?: number, elapsedSeconds?: number) {
    const fd = new FormData();
    files.forEach(f => fd.append("files", f));
    fd.append("seq_len", String(seqLen));
    if (elapsedSeconds != null) fd.append("elapsed_seconds", String(elapsedSeconds));
    else if (totalFilesSeen != null) fd.append("total_files_seen", String(totalFilesSeen));
    else throw new Error("Need total_files_seen or elapsed_seconds");
    const res = await fetch(`${apiBase}/predict/sequence`, { method: "POST", body: fd });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}