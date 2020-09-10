import React, { Suspense } from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Register from "../components/register"

const Index = () => {
  const LazyCoverflow = () => {
    if (typeof window === "undefined") return <span>Loading...</span>
    const Component = React.lazy(() => import("../components/coverflow"))
    return (
      <>
        <Suspense fallback={<span>Loading...</span>}>
          <Component />
        </Suspense>
      </>
    )
  }

  const { t } = useTranslation()

  return (
    // <SEO title="Home" />

    <div className="App">
      <LazyCoverflow />
      <Register t={t} />
    </div>
  )
}

export default Index
