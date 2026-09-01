import "./home-theme.css";
import HomeExperience from "@/components/HomeExperience";

// New dark/orange home. Fully self-contained (its own nav + footer inside the
// HomeExperience client component); the theme CSS is scoped under `.ag`.
export default function Home() {
  return <HomeExperience />;
}
