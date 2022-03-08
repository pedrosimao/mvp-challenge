import { CreateStyled } from '@emotion/styled/macro'

export const transientOptions: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
}
