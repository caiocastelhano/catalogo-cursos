using System.Globalization;
using System.Text;

namespace CatalogoCursos.Utils;

public static class Texto
{
    // Remove acentos e ignora maiúsculas para a busca por nome.
    public static string Normalizar(string valor)
    {
        var decomposto = valor.Trim().Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder(decomposto.Length);
        foreach (var c in decomposto)
        {
            if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                sb.Append(c);
        }
        return sb.ToString().Normalize(NormalizationForm.FormC).ToLowerInvariant();
    }
}