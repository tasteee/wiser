import { db } from "./database.mjs"

export const asyncGet = (options) => {
  return (input) => {
    const shouldComputeData = !!options.getData
    const data = shouldComputeData ? options.getData(input) : input

    return new Promise((resolve) => {
      const handleResult = (error, data) => {
        const finalData = data || options.fallbackData || null
        const final = { didError: !!error, error, data: finalData }
        resolve(final)
      }

      db.get(options.query, data, handleResult)
    })
  }
}

export const asyncGetAll = (options) => {
  return () => {
    return new Promise((resolve) => {
      const handleResult = (error, data) => {
        const finalData = data || options.fallbackData || []
        const final = { didError: !!error, error, data: finalData }
        resolve(final)
      }

      db.all(options.query, handleResult)
    })
  }
}

export const asyncCreate = (options) => {
  return (input) => {
    const shouldComputeData = !!options.getData
    const data = shouldComputeData ? options.getData(input) : input

    return new Promise((resolve) => {
      const handleResult = (error, data = {}) => {
        const final = { didError: !!error, error, data }
        resolve(final)
      }

      db.serialize(() => {
        db.run(options.query, data, handleResult)
      })
    })
  }
}

export const asyncUpdate = (options) => {}

export const asyncSearch = (options) => {
  return (parameters) => {
    return new Promise((resolve) => {
      let query = options.baseQuery
      const paramKeyQueryPieces = options.paramKeyQueryPieces || {}
      const paramKeyQueryPiecesEntries = Object.entries(paramKeyQueryPieces)
      const queryParams = []
      const conditions = []

      for (const [parameterKey, queryPiece] of paramKeyQueryPiecesEntries) {
        if (parameterKey in parameters) {
          conditions.push(queryPiece)
          queryParams.push(parameterKey)
        }
      }

      if ("name" in parameters) {
        conditions.push(`name LIKE '%${parameters.name}%'`)
      }

      if (conditions.length > 0) {
        const joinedConditions = conditions.join(" AND ")
        query += ` WHERE ${joinedConditions}`
      }

      const handleResult = (error, data = []) => {
        const final = { didError: !!error, error, data }
        resolve(final)
      }

      db.all(query, queryParams, handleResult)
    })
  }
}

export const asyncRemoveById = (options) => {
  return (id) => {
    return new Promise((resolve) => {
      const handleResult = (error, data = {}) => {
        const final = { didError: !!error, error, data }
        resolve(final)
      }

      db.serialize(() => {
        db.run(options.query, id, handleResult)
      })
    })
  }
}
