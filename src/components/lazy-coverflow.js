import React, { Suspense } from "react"
import ClipLoader from "react-spinners/ClipLoader"

export default function LazyCoverflow() {
  if (typeof window === "undefined")
    return (
      <div className="coverflow-container">
        <ClipLoader />
      </div>
    )
  const Component = React.lazy(() => import("../components/coverflow"))
  return (
    <div>
      <Suspense
        fallback={
          <div className="coverflow-container">
            <ClipLoader />
          </div>
        }
      >
        <Component />
      </Suspense>
    </div>
  )
}
