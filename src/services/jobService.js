import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

function toMs(value) {
  if (!value) return Date.now();
  if (typeof value === "number") return value;
  if (typeof value === "object") {
    if (typeof value.seconds === "number") return value.seconds * 1000;
    if (typeof value.toDate === "function") return value.toDate().getTime();
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? Date.now() : d.getTime();
}

function normalize(job) {
  return {
    ...job,
    createdAt: toMs(job.createdAt),
    updatedAt: toMs(job.updatedAt),
  };
}

const byNewest = (a, b) => (b.createdAt || 0) - (a.createdAt || 0);

function ensureFirebase() {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }
}

export const jobService = {
  subscribeToJobs(uid, onNext, onError) {
    if (!uid) {
      onNext([]);
      return () => {};
    }
    ensureFirebase();

    const q = query(collection(db, "jobs"), where("uid", "==", uid));
    return onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs
          .map((d) => normalize({ id: d.id, ...d.data() }))
          .sort(byNewest);
        onNext(list);
      },
      (err) => onError && onError(err)
    );
  },

  async addJob(uid, data) {
    ensureFirebase();
    const payload = { ...data, uid };
    const ref = await addDoc(collection(db, "jobs"), {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: ref.id, ...payload };
  },

  async updateJob(uid, id, data) {
    ensureFirebase();
    const payload = { ...data };
    await updateDoc(doc(db, "jobs", id), {
      ...payload,
      updatedAt: serverTimestamp(),
    });
    return { id, ...payload };
  },

  async deleteJob(uid, id) {
    ensureFirebase();
    await deleteDoc(doc(db, "jobs", id));
    return id;
  },

  async clearAll(uid) {
    ensureFirebase();
    const snap = await getDocs(query(collection(db, "jobs"), where("uid", "==", uid)));
    const batch = writeBatch(db);
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    return true;
  },
};
