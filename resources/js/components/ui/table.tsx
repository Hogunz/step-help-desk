import React from 'react'

function table() {
  return (
    <>


<div className="relative overflow-x-auto">


    <div className="mb-4">
       <div className='mb-2'><label htmlFor="">Subject</label></div>
        <input
            type="subject"
            name="subject"
            id="subject"
            placeholder="Ex. STEP error"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

        />
    </div>

    <div className="mb-4">
       <div className='mb-2'><label htmlFor="">Message</label></div>
<textarea id="message" rows={10} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
    </div>



</div>

    </>
  )
}

export default table
