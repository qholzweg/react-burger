import reducer, { resetRequested, resetDrop, TUserState } from './user-slice'

describe('Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      { resetRequested: false }
    )
  })
  it('should handle a request reset password', () => {
    expect(reducer({ resetRequested: false }, resetRequested())).toEqual(
      { resetRequested: true }
    )
  })
  
  it('should revert to the initial state', () => {
    expect(reducer({ resetRequested: true }, resetDrop())).toEqual(
      { resetRequested: false }
    )
  })

})


